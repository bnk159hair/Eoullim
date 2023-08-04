import React from 'react';
import LoginUser from '../../components/main/LoginUser';
import { useNavigate } from 'react-router-dom';
import { MainPageContainer } from './Main.styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';

const Main = () => {
  const navigate = useNavigate();
  const profileId = useRecoilValue(Profilekey);

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
      <ArrowLeftIcon
        onClick={getBack}
        sx={{ fontSize: '140px', position: 'absolute', top: '0', left: '0' }}
      />

      <button onClick={getNewFriend}>새친구 만들기</button>
      <button onClick={handleFriendsClick}>내친구 목록</button>
      <LoginUser />
    </MainPageContainer>
  );
};

export default Main;
