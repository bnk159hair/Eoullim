import React from 'react';
import LoginUser from '../../components/main/LoginUser';
import { useNavigate } from 'react-router-dom';
import joinSession from '../../components/Session/Viedo';

const Main = () => {
  const navigate = useNavigate();

  const getNewFriend = () => {
    joinSession();
    navigate('/session');
  };

  const handleFriendsClick = () => {
    navigate('/friends');
  };

  return (
    <div>
      메인페이지
      <button onClick={getNewFriend}>새친구 만들기</button>
      <button onClick={handleFriendsClick}>내친구 목록</button>
      <LoginUser />
    </div>
  );
};

export default Main;
