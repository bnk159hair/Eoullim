import React, { useState, useEffect } from 'react';
import LoginTag from '../../components/Login/LoginTag';
import {LoginPageContainer,LoginTagContainer,Logo} from './Login.styles'

const Login = () => {

  return (
    <LoginPageContainer>
      <LoginTagContainer>
        <LoginTag/>
      </LoginTagContainer>
      <Logo/>
    </LoginPageContainer>
  );
}

export default Login;
