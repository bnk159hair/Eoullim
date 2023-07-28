import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupTag from '../../components/Signup/SignupTag';

interface UserData {
  guardianName: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const Signup = () => {
  const handleSignup = (userData: UserData) => {
    // 여기에서 서버로 userData를 보내고 회원가입을 처리하는 로직을 추가할 수 있습니다.
    console.log('회원가입 정보:', userData);
  };

  return (
    <>
      <h1>회원가입</h1>
      <br />
      <SignupTag onSignup={handleSignup}/>
    </>
  );
}

export default Signup;
