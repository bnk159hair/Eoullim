import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/Auth';
import {
  FormContainer,
  LoginButton,
  ButtonContainer,
  SignupButton,
} from './LoginStyles';
import { TextField } from '@mui/material';
import { API_BASE_URL } from '../../apis/urls';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(`${API_BASE_URL}/users/login`, { userName, password })
      .then((response) => {
        setToken(response.data.result);
        navigate('/profile');
      })
      .catch((error) => {
        alert('아이디와 비밀번호를 확인해주세요.');
      });
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleLogin}>
          <TextField
            label="아이디"
            variant="filled"
            color="success"
            margin="normal"
            value={userName}
            sx={{
              bgcolor: 'white',
              borderRadius: '5px',
              marginLeft: '40px',
              width: '90%',
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
          <TextField
            label="비밀번호"
            variant="filled"
            color="success"
            margin="normal"
            type="password"
            value={password}
            sx={{
              bgcolor: 'white',
              borderRadius: '5px',
              marginLeft: '40px',
              width: '90%',
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </form>
        <ButtonContainer>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SignupButton onClick={handleSignup}>회원가입</SignupButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default Login;
