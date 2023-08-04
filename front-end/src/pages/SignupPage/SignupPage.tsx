import React from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../../components/signup/Signup';
import { SignupPageContainer, SignupTagContainer } from './SignupPageStyles';

const SignupPage = () => {
  return (
    <SignupPageContainer>
      <div>회원가입</div>
      <br />
      <SignupTagContainer>
        <Signup />
      </SignupTagContainer>
    </SignupPageContainer>
  );
};

export default SignupPage;
