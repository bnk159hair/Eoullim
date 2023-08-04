import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/Auth';
import {
  LoginContainer,
  LoginButton,
  LoginButtonContainer,
} from './LoginPageStyles';
import { TextField, Box } from '@mui/material';
import { BASEURL } from '../../apis/urls';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
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
      <LoginContainer>
        <div>
          <Box component="form" onSubmit={handleLogin}>
            <div>
              <TextField
                label="아이디"
                variant="filled"
                color="success"
                margin="dense"
                value={userName}
                sx={{ bgcolor: 'white', borderRadius: '5px' }}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label="비밀번호"
                variant="filled"
                color="success"
                margin="dense"
                type="password"
                value={password}
                sx={{ bgcolor: 'white', borderRadius: '5px' }}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </Box>
        </div>
        <div>
          <LoginButtonContainer>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          </LoginButtonContainer>
          <button onClick={handleSignup}>회원가입</button>
        </div>
      </LoginContainer>
    </div>
  );
};

export default Login;
