import React from 'react';
import LoginUser from '../../components/main/LoginUser';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleStreamClick = () => {
    navigate('/stream');
  };

  const handleFriendsClick = () => {
    navigate('/friends');
  };

  return (
    <div>
      메인페이지
      <button onClick={handleStreamClick}>새친구 만들기</button>
      <button onClick={handleFriendsClick}>내친구 목록</button>
      <LoginUser />
    </div>
  );
};

export default Main;
