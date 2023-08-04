import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/Auth';
import {
  LoginTagContainer,
  LoginInput,
  LoginButton,
  LoginButtonContainer,
} from './LoginTag.styles';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

const LoginTag = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const BASEURL = 'http://localhost:8080/api/v1';
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogin = (event: any) => {
    event.preventDefault();
    axios
      .post(`${BASEURL}/users/login`, { userName, password })
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
    <div>
      <LoginTagContainer>
        <div>
          <Box component="form" onSubmit={handleLogin}>
            <div>
              <TextField
                required
                label="아이디"
                variant="filled"
                color="success"
                margin="dense"
                value={userName}
                sx={{ bgcolor: 'beige', borderRadius: '5px' }}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                required
                label="비밀번호"
                variant="filled"
                color="success"
                margin="dense"
                type="password"
                value={password}
                sx={{ bgcolor: 'beige', borderRadius: '5px' }}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </Box>
          {/* <div>
            <LoginInput
              type="text"
              placeholder="아이디"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <LoginInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
        </div>
        <div>
          <LoginButtonContainer>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </LoginButtonContainer>
          <button onClick={handleSignup}>회원가입</button>
        </div>
      </LoginTagContainer>
    </div>
  );
};

export default LoginTag;
