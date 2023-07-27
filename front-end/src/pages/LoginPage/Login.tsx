import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Main from '../MainPage/Main';
import LoginTag from '../../components/Login/LoginTag';

const Login = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('로그인 정보:', username, password);
  };

  return (
    <>
      <LoginTag onLogin={handleLogin}/>
    </>
  );
}

export default Login;
