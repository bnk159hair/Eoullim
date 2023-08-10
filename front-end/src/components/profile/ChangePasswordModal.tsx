import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalOverlay,
  ModalContent,
  FormContainer,
  HeaderContainer,
} from './ChangePasswordModalStyles';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/Auth';
import { API_BASE_URL } from '../../apis/urls';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ChagePasswordModalProps {
  onClose: () => void;
}

const ChagePasswordModal: React.FC<ChagePasswordModalProps> = ({ onClose }) => {
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const token = useRecoilValue(tokenState);
  const [, setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();

  const handlePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newValue = event.target.value;
    setPasswordConfirmation(newValue);
    setIsPasswordMatch(newPassword === newValue);
  };

  const logoutClick = () => {
    axios
      .get(`${API_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setToken('');
        navigate('/login');
      })
      .catch((error) => {
        console.log(token);
        console.log('로그아웃 오류:', error);
        setToken('');
        navigate('/login');
      });
  };

  const handleChagePassword = async (event: any) => {
    event?.preventDefault();
    if (!curPassword) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    if (!isPasswordMatch) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const usersData = { curPassword, newPassword };
      const response = await axios.put(`${API_BASE_URL}/users`, usersData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('비밀번호 변경성공', response);
      // onClose();
      logoutClick();
    } catch (error) {
      console.log(token);
      console.log('비밀번호 변경 실패', error);
      alert('현재 비밀번호가 틀렸습니다.');
      return;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <FormContainer onSubmit={handleChagePassword}>
          <HeaderContainer>
            <h2>비밀번호 변경</h2>
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </HeaderContainer>

          <TextField
            label="현재 비밀번호"
            variant="outlined"
            margin="dense"
            type="password"
            value={curPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement> | any) =>
              setCurPassword(event.target.value)
            }
          />
          <TextField
            label="새 비밀번호"
            variant="outlined"
            margin="dense"
            type="password"
            value={newPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement> | any) =>
              setNewPassword(event.target.value)
            }
          />
          <TextField
            label="새 비밀번호 확인"
            variant="outlined"
            margin="dense"
            type="password"
            value={passwordConfirmation}
            onChange={(event: React.ChangeEvent<HTMLInputElement> | any) =>
              handlePasswordConfirmation(event)
            }
            error={!isPasswordMatch}
            helperText={!isPasswordMatch && '비밀번호가 일치하지 않습니다.'}
          />
        </FormContainer>
        <Button
          variant="contained"
          size="large"
          sx={{ padding: '0.6rem', marginTop: '1rem', fontSize: '18px' }}
          onClick={handleChagePassword}
          fullWidth
        >
          변경하기
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChagePasswordModal;
