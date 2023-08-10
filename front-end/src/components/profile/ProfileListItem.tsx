import React, { useState, useEffect } from 'react';
import {
  ProfileContainer,
  ProfileUserContainer,
  NameTag,
} from './ProfileListItemStyles';
import ModifyModal from './ModifyModal';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apis/urls';
import axios from 'axios';
import { tokenState, userState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button } from '@mui/material';

interface ProfileListItemProps {
  name: string;
  childId: number;
  resetList: () => void;
  imgurl: string;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  name,
  childId,
  resetList,
  imgurl,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);
  const [userName, setUserName] = useRecoilState(userState);
  const IMGURL = `/${imgurl}.png`;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMainClick = () => {
    console.log(childId, name);
    setProfileKey(childId);
    setUserName(name);
    profileLogin();
    navigate('/');
  };

  const profileLogin = () => {
    axios
      .post(
        `${API_BASE_URL}/children/login/${childId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('프로필로그인');
      })
      .catch((error) => {
        console.log('프로필 로그인 오류', error);
      });
  };

  return (
    <ProfileContainer>
      <ProfileUserContainer
        style={{ backgroundImage: `url(${IMGURL})` }}
        onClick={handleMainClick}
      >
        <NameTag>{name}</NameTag>
      </ProfileUserContainer>
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: '18px' }}
        onClick={handleModalOpen}
        fullWidth
      >
        프로필 관리
      </Button>
      {isModalOpen && (
        <ModifyModal
          onClose={handleModalClose}
          childId={childId}
          resetList={resetList}
        />
      )}
    </ProfileContainer>
  );
};

export default ProfileListItem;
