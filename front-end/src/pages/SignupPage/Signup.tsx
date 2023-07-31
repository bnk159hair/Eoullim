import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupTag from '../../components/Signup/SignupTag';



const Signup = () => {
  return (
    <>
      <h1>회원가입</h1>
      <br />
      <SignupTag/>
    </>
  );
}

export default Signup;
