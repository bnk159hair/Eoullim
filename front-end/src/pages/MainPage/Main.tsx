import React from 'react';
import LoginUser from '../../components/main/LoginUser';
import { useNavigate } from 'react-router-dom';
import { MainPageContainer} from './Main.styles'

const Main = () => {
  const navigate = useNavigate();

  const getNewFriend = () => {
    navigate('/session');
  };

  const handleFriendsClick = () => {
    navigate('/friends');
  };
  const getBack = () => {
    navigate('/profile');
  };
  return (
    <MainPageContainer>
      메인페이지
      <button onClick={getNewFriend}>새친구 만들기</button>
      <button onClick={handleFriendsClick}>내친구 목록</button>
      <LoginUser />
      <button onClick={getBack}>뒤로가기</button>
    </MainPageContainer>
  );
};

export default Main;
