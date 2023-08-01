import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInUserIdState } from '../../atoms/Login';
import {LoginTagContainer, LoginInput, LoginButton, LoginButtonContainer} from './LoginTag.styles'


const LoginTag = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const BASEURL = 'http://localhost:8080/api/v1';
  // const [loggedInUserId, setLoggedInUserId] = useRecoilState(loggedInUserIdState);

  const handleLogin = () => { 
    axios.post(`${BASEURL}/users/login`, { userName, password },{withCredentials: true})
      .then((response) => {
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
          <div>
            <LoginInput type="text" placeholder="아이디" value={userName} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <LoginInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
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
