// LoginTag.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInUserIdState } from '../../atoms/Login';


const LoginTag = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const BASEURL = 'https://i9c207.p.ssafy.io/api/v1';
  // const [loggedInUserId, setLoggedInUserId] = useRecoilState(loggedInUserIdState);

  const handleLogin = () => { 
    axios.post(`${BASEURL}/login`, { userName, password })
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
      <h1>로그인</h1>
      <div>
        <input type="text" placeholder="아이디" value={userName} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin}>로그인</button>
      </div>
      <div>
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

export default LoginTag;
