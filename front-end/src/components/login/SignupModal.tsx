import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';
import {
  ModalOverlay,
  ModalContent,
  ModalHeaderContainer,
  ModalFormContainer,
  IdContainer,
} from './SignupModalStyles';
import { TextField, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b6d36f',
    },
  },
});

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const phoneNumberPattern = /^010\d{8}$/;

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    if (isIdUnique === false) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }

    if (!userName || !password || !name || !phoneNumber) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const isValidPhoneNumber = phoneNumberPattern.test(phoneNumber);
    if (!isValidPhoneNumber) {
      alert('올바른 전화번호 형식이 아닙니다.');
      return;
    }

    try {
      const signUpData = { userName, password, name, phoneNumber };
      const response = await axios.post(
        `${API_BASE_URL}/users/join`,
        signUpData
      );
      onClose();
      console.log('회원가입 성공:', response);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const handleIdCheck = async (event: any) => {
    event.preventDefault();
    if (userName.trim() === '') {
      alert('아이디를 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/users/id-check`, {
        userName: userName,
      });
      setIsIdUnique(response.data.resultCode);
      console.log('아이디 중복 확인 결과:', response);
      alert(
        response.data.resultCode
          ? '사용 가능한 아이디입니다.'
          : '이미 사용 중인 아이디입니다.'
      );
    } catch (error) {
      console.error('아이디 중복 확인 에러:', error);
      alert('이미 사용 중인 아이디입니다.');
    }
  };

  const handlePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newValue = event.target.value;
    setPasswordConfirmation(newValue);
    setIsPasswordMatch(password === newValue);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ThemeProvider theme={theme}>
          <ModalHeaderContainer>
            <h2>회원가입</h2>
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </ModalHeaderContainer>
          <ModalFormContainer>
            <IdContainer>
              <TextField
                label="아이디"
                variant="outlined"
                margin="dense"
                value={userName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(event.target.value)
                }
                sx={{ width: '75%' }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ padding: '0.8rem', marginLeft: 'auto', fontSize: '16px' }}
                onClick={handleIdCheck}
              >
                중복확인
              </Button>
            </IdContainer>
            <TextField
              label="비밀번호"
              variant="outlined"
              margin="dense"
              type="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <TextField
              label="비밀번호 확인"
              variant="outlined"
              margin="dense"
              type="password"
              value={passwordConfirmation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handlePasswordConfirmation(event)
              }
              error={!isPasswordMatch}
              helperText={!isPasswordMatch && '비밀번호가 일치하지 않습니다.'}
            />
            <TextField
              label="이름"
              variant="outlined"
              margin="dense"
              value={name}
              placeholder="홍길동"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
            <TextField
              label="전화번호"
              variant="outlined"
              margin="dense"
              value={phoneNumber}
              placeholder="01012345678"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(event.target.value)
              }
              helperText="'-'없이 입력해주세요."
            />
            <Button
              variant="contained"
              size="large"
              sx={{ padding: '0.6rem', marginTop: '1rem', fontSize: '20px' }}
              onClick={handleSignUp}
            >
              가입완료
            </Button>
          </ModalFormContainer>
        </ThemeProvider>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SignupModal;
