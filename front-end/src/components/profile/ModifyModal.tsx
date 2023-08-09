import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContent,
  FormContainer,
  ButtonContainer,
} from "./ModifyModalStyles";
import { tokenState } from "../../atoms/Auth";
import { Profilekey } from "../../atoms/Profile";
import { useRecoilValue, useRecoilState } from "recoil";
import { API_BASE_URL } from "../../apis/urls";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    name: "",
    birth: 0,
    gender: "",
    school: "",
    grade: 0,
    status: "",
  });

  const token = useRecoilValue(tokenState);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);
  const navigate = useNavigate();

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
        console.log("아이 프로필을 불러오는데 실패했습니다:", error);
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
        alert("비밀번호를 확인해주세요.");
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

      console.log("프로필 수정 성공:", response);
      resetList();
      onClose();
    } catch (error) {
      console.log("프로필 수정 실패:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChildProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const convertTimestampToKoreanDate = (timestamp: number) => {
    const utcDate = new Date(timestamp);
    const koreaTimezoneOffset = 9 * 60;
    const koreaDate = new Date(
      utcDate.getTime() + koreaTimezoneOffset * 60 * 1000
    );
    const koreanDateString = koreaDate.toISOString().slice(0, 10);
    console.log(koreanDateString);
    return koreanDateString;
  };

  const handleRecordClick = () => {
    setProfileKey(childId);
    navigate("/record");
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
        console.log("삭제완료");
      })
      .catch((error) => console.log("실패"));
  };
  return (
    <ModalOverlay>
      <ModalContent>
        {!isPasswordCorrect ? (
          <FormContainer onSubmit={passwordCheck}>
            <h2>비밀번호 확인</h2>
            <TextField
              label='비밀번호 확인'
              variant='outlined'
              margin='dense'
              type='password'
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <ButtonContainer>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px", margin: "0.5rem" }}
                onClick={passwordCheck}
                fullWidth>
                확인
              </Button>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px", margin: "0.5rem" }}
                onClick={onClose}
                fullWidth>
                닫기
              </Button>
            </ButtonContainer>
          </FormContainer>
        ) : (
          <FormContainer>
            <h2>프로필 수정</h2>
            <TextField
              label='이름'
              variant='outlined'
              margin='dense'
              name='name'
              value={childProfile.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='생년월일'
                // value={convertTimestampToKoreanDate(childProfile.birth)}
                // onChange={handleInputChange}
              />
            </LocalizationProvider>
            <input
              type='date'
              placeholder='생년월일'
              name='birth'
              value={convertTimestampToKoreanDate(childProfile.birth)}
              onChange={handleInputChange}
            />
            <ToggleButtonGroup
              color='primary'
              // value={alignment}
              exclusive
              // onChange={handleChange}
            >
              <ToggleButton value='M'>남성</ToggleButton>
              <ToggleButton value='W'>여성</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              label='학교'
              variant='outlined'
              margin='dense'
              name='school'
              value={childProfile.school}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event)
              }
            />
            <ToggleButtonGroup
              color='primary'
              // value={alignment}
              exclusive
              // onChange={handleChange}
            >
              <ToggleButton value='1'>1학년</ToggleButton>
              <ToggleButton value='2'>2학년</ToggleButton>
              <ToggleButton value='3'>3학년</ToggleButton>
            </ToggleButtonGroup>
            {/* <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={childProfile.gender === 'M'}
                  onChange={handleInputChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="W"
                  checked={childProfile.gender === 'W'}
                  onChange={handleInputChange}
                />
                여성
              </label>
            </div>
            
            <div>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="1"
                  checked={childProfile.grade == 1}
                  onChange={handleInputChange}
                />
                1학년
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="2"
                  checked={childProfile.grade == 2}
                  onChange={handleInputChange}
                />
                2학년
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="3"
                  checked={childProfile.grade == 3}
                  onChange={handleInputChange}
                />
                3학년
              </label>
            </div> */}
            <ButtonContainer>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px" }}
                onClick={handleUpdateProfile}>
                수정
              </Button>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px" }}
                onClick={deleteProfile}>
                삭제
              </Button>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px" }}
                onClick={handleRecordClick}>
                녹화영상
              </Button>
              <Button
                variant='contained'
                size='small'
                color='info'
                sx={{ fontSize: "18px" }}
                onClick={onClose}>
                닫기
              </Button>
            </ButtonContainer>
          </FormContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModifyModal;
