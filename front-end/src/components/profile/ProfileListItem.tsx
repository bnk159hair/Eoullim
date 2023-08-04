import React, { useState } from 'react';
import { ProfileUsereBox } from './ProfileListItemStyles';
import ModifyModal from './ModifyModal';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../../apis/urls';
import axios from 'axios';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue, useRecoilState } from 'recoil';

interface ProfileListItemProps {
  name: string;
  ChildId: number;
  resetList: () => void;
  imgurl: string;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  name,
  ChildId,
  resetList,
  imgurl,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMainClick = () => {
    setProfileKey(ChildId);
    profileLogin();
    navigate('/');
  };

  const handleRecordClick = () => {
    setProfileKey(ChildId);
    navigate('/record');
  };

  const profileLogin = () => {
    axios
      .post(
        `${BASEURL}/children/login/${ChildId}`,
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

  const deleteProfile = () => {
    axios
      .delete(`${BASEURL}/children/${ChildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resetList();
        console.log('삭제완료');
      })
      .catch((error) => console.log('실패'));
  };

  return (
    <div>
      <ProfileUsereBox onClick={handleMainClick}>
        {name}
        {ChildId}
        {imgurl}
      </ProfileUsereBox>
      <button onClick={handleModalOpen}>수정</button>
      {isModalOpen && (
        <ModifyModal
          onClose={handleModalClose}
          ChildId={ChildId}
          resetList={resetList}
        />
      )}
      <button onClick={deleteProfile}>삭제</button>
      <button onClick={handleRecordClick}>녹화영상</button>
    </div>
  );
};

export default ProfileListItem;
