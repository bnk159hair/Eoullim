import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileListItem = () => {
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     navigate('/');
//   };
//   const handleProfileModify = () =>{
//     navigate('/profile/modify')
//   }

  return (
    <div>
      {/* <button type='button' onClick={handleProfileClick}> */}
      프로필 선택
      프로필 사진
      프로필 이름
      수정 태그
      {/* <button type='button' onClick={handleProfileModify}></button> */}
      녹화 태그
      {/* </button> */}
    </div>
  );
};

export default ProfileListItem;
