import React, { useState, useEffect } from 'react';
import LoginTag from '../../components/Login/LoginTag';
import {LoginPageContainer,LoginTagContainer} from './Login.styles'

const Login = () => {

  return (
    <LoginPageContainer>
      <LoginTagContainer>
        <LoginTag/>
      </LoginTagContainer>
    </LoginPageContainer>
  );
}

export default Login;
