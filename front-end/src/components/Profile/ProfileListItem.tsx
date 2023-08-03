import React, { useState } from 'react';
import { ProfileUsereBox } from './profileListItem.styles';
import ModifyModal from './ModifyModal';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../../apis/api';
import axios from 'axios';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue, useRecoilState } from 'recoil';

interface ProfileListItemProps {
  name: string;
  ChildId: number;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ name, ChildId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey); // 변경된 부분

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMainClick = () => {
    setProfileKey(ChildId);
    navigate('/');
  };

  const handleRecordClick = () => {
    setProfileKey(ChildId);
    navigate('/record');
  };

  const deleteProfile = () => {
    axios
      .delete(`${BASEURL}/children/${ChildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log('삭제완료'))
      .catch((error) => console.log('실패'));
  };

  return (
    <div>
      <ProfileUsereBox onClick={handleMainClick}>
        {name}
        {ChildId}
      </ProfileUsereBox>
      <button onClick={handleModalOpen}>수정</button>
      {isModalOpen && <ModifyModal onClose={handleModalClose} ChildId={ChildId} />}
      <button onClick={deleteProfile}>삭제</button>
      <button onClick={handleRecordClick}>녹화영상</button>
    </div>
  );
};

export default ProfileListItem;
