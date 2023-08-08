import React, { useState } from 'react';
import axios from 'axios';
import ProfileList from '../../components/profile/ProfileList';
import {
  ProfilePageContainer,
  PasswordChange,
  MarginContainer,
} from './ProfilePageStyles';
import ChagePasswordModal from '../../components/profile/ChangePasswordModal';
import { API_BASE_URL } from '../../apis/urls';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();
  const [, setToken] = useRecoilState(tokenState);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const logoutClick = () => {
    axios
      .get(`${API_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setToken('');
        navigate('/login');
      })
      .catch((error) => {
        console.log(token);
        console.log('로그아웃 오류:', error);
        setToken('');
        navigate('/login');
      });
  };

  return (
    <ProfilePageContainer>
      <MarginContainer>
        <PasswordChange onClick={handleModalOpen} />
      </MarginContainer>
      {isModalOpen && <ChagePasswordModal onClose={handleModalClose} />}
      <ProfileList />
      <MarginContainer>
        <button onClick={logoutClick}>로그아웃</button>
      </MarginContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
