import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { API_BASE_URL } from '../../apis/urls';
import {
  ModalOverlay,
  ModalContent,
  FormContainer,
  ButtonContainer,
  HeaderContainer,
  FlexContainer,
} from './ModifyModalStyles';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

interface ChildProfile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
}

interface ModifyModalProps {
  onClose: () => void;
  childId: number;
  resetList: () => void;
}

const ModifyModal: React.FC<ModifyModalProps> = ({
  onClose,
  childId,
  resetList,
}) => {
  const [childProfile, setChildProfile] = useState<ChildProfile>({
    id: 0,
    name: '',
    birth: 0,
    gender: '',
    school: '',
    grade: 0,
    status: '',
  });

  const token = useRecoilValue(tokenState);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [schoolChange, setSchoolChange] = useState(false);
  const [isSchoolCorrect, setIsSchoolCorrect] = useState(false);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);
  const navigate = useNavigate();
  // dayjs.locale('ko');

  useEffect(() => {
    fetchChildProfile();
  }, [childId, token]);

  const fetchChildProfile = () => {
    axios
      .get(`${API_BASE_URL}/children/${childId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setChildProfile(response.data.result);
      })
      .catch((error) => {
        console.log('아이 프로필을 불러오는데 실패했습니다:', error);
      });
  };

  const passwordCheck = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${API_BASE_URL}/users/pw-check`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsPasswordCorrect(true);
      })
      .catch((error) => {
        alert('비밀번호를 확인해주세요.');
      });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/children/${childProfile.id}`,
        childProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('프로필 수정 성공:', response);
      resetList();
      onClose();
    } catch (error) {
      console.log('프로필 수정 실패:', error);
    }
  };

  const handleSchoolCheck = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/children/school`,
        {
          keyword: childProfile.school,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSchoolCorrect(response.data.resultCode);

      alert(
        response.data.resultCode ? '올바른 학교정보입니다' : '다시 입력해주세요'
      );
    } catch (error) {
      console.error(error);
      alert('잘못된 입력입니다.');
    }
  };

  const handleRecordClick = () => {
    setProfileKey(childId);
    navigate('/record');
  };

  const deleteProfile = () => {
    axios
      .delete(`${API_BASE_URL}/children/${childId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resetList();
        console.log('삭제완료');
      })
      .catch((error) => console.log('실패'));
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {!isPasswordCorrect ? (
          <FormContainer onSubmit={passwordCheck}>
            <h2>비밀번호 확인</h2>
            <TextField
              label="비밀번호 확인"
              variant="outlined"
              margin="dense"
              type="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement> | any) =>
                setPassword(event.target.value)
              }
            />
            <ButtonContainer>
              <Button
                variant="contained"
                size="small"
                color="info"
                sx={{ fontSize: '18px', margin: '0.5rem' }}
                onClick={passwordCheck}
                fullWidth
              >
                확인
              </Button>
              <Button
                variant="contained"
                size="small"
                color="info"
                sx={{ fontSize: '18px', margin: '0.5rem' }}
                onClick={onClose}
                fullWidth
              >
                닫기
              </Button>
            </ButtonContainer>
          </FormContainer>
        ) : (
          <FormContainer>
            <HeaderContainer>
              <h2>프로필 수정</h2>
              <IconButton onClick={onClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </HeaderContainer>
            <FlexContainer>
              <TextField
                label="이름"
                variant="outlined"
                placeholder="홍길동"
                value={childProfile.name}
                onChange={(event) => {
                  setChildProfile((prevProfile) => ({
                    ...prevProfile,
                    name: event.target.value,
                  }));
                }}
                sx={{ width: '65%', marginBottom: '1rem' }}
              />
              <ToggleButtonGroup
                color="primary"
                value={childProfile.gender}
                exclusive
                sx={{ marginLeft: 'auto' }}
                size="large"
                onChange={(_, newGender) => {
                  setChildProfile((prevProfile) => ({
                    ...prevProfile,
                    gender: newGender,
                  }));
                }}
              >
                <ToggleButton value="M">남성</ToggleButton>
                <ToggleButton value="W">여성</ToggleButton>
              </ToggleButtonGroup>
            </FlexContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="생년월일"
                value={dayjs(childProfile.birth)}
                onChange={(newDate: dayjs.Dayjs | null) => {
                  if (newDate) {
                    setChildProfile((prevProfile: any) => ({
                      ...prevProfile,
                      birth: newDate.format('YYYY-MM-DD'),
                    }));
                  }
                }}
                format="YYYY-MM-DD"
                sx={{ marginBottom: '1rem' }}
              />
            </LocalizationProvider>
            <FlexContainer>
              <TextField
                label="학교 이름"
                variant="outlined"
                value={childProfile.school}
                onChange={(event) => {
                  setChildProfile((prevProfile) => ({
                    ...prevProfile,
                    school: event.target.value,
                  }));
                  setSchoolChange(true);
                }}
                sx={{ width: '65%', marginBottom: '1rem' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">초등학교</InputAdornment>
                  ),
                }}
                helperText={isSchoolCorrect && '학교 등록이 완료되었습니다.'}
                disabled={isSchoolCorrect && true}
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: '25%',
                  padding: '0.7rem',
                  marginLeft: 'auto',
                  fontSize: '18px',
                }}
                onClick={handleSchoolCheck}
              >
                학교확인
              </Button>
            </FlexContainer>
            <ToggleButtonGroup
              color="primary"
              value={String(childProfile.grade)}
              exclusive
              fullWidth
              onChange={(_, newGrade) => {
                setChildProfile((prevProfile) => ({
                  ...prevProfile,
                  grade: newGrade,
                }));
              }}
            >
              <ToggleButton value="1">1학년</ToggleButton>
              <ToggleButton value="2">2학년</ToggleButton>
              <ToggleButton value="3">3학년</ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              size="small"
              sx={{
                padding: '0.6rem',
                marginTop: '1rem',
                fontSize: '18px',
              }}
              fullWidth
              onClick={handleRecordClick}
            >
              녹화영상
            </Button>
            <ButtonContainer>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  width: '50%',
                  padding: '0.6rem',
                  marginTop: '1rem',
                  fontSize: '18px',
                }}
                onClick={handleUpdateProfile}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{
                  width: '50%',
                  padding: '0.6rem',
                  marginTop: '1rem',
                  fontSize: '18px',
                }}
                onClick={deleteProfile}
              >
                삭제
              </Button>
            </ButtonContainer>
          </FormContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModifyModal;
