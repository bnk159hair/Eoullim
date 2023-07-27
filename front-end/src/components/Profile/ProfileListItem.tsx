import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileListItem = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/');
  };

  return (
    <div>
      프로필 사진
      이름
      <button type="button" onClick={handleProfileClick}>프로필 선택</button>
    </div>
  );
};

export default ProfileListItem;
