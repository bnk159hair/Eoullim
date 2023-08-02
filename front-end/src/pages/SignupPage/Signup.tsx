import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupTag from '../../components/Signup/SignupTag';
import {SignupPageContainer,SignupTagContainer} from './Signup.styles'


const Signup = () => {
  return (
    <SignupPageContainer>
      <div>회원가입</div>
      <br />
      <SignupTagContainer>
        <SignupTag/>
      </SignupTagContainer> 
    </SignupPageContainer>
  );
}

export default Signup;
