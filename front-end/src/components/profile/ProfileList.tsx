import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileListItem from './ProfileListItem';
import { ProfileCreateBox, ProfileListBox } from './ProfileListStyles';
import CreateModal from './CreateModal';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import { API_BASE_URL } from '../../apis/urls';

interface Profile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
  animon: { id: 0; imagePath: ''; name: '' };
}

const ProfileList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    resetList();
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const resetList = () => {
    axios
      .get(`${API_BASE_URL}/children`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.result;
        setProfiles(data); // profiles 상태 업데이트
        console.log(data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  return (
    <ProfileListBox>
      {profiles.map((profile) => (
        <ProfileListItem
          key={profile.id}
          ChildId={profile.id}
          name={profile.name}
          resetList={resetList}
          imgurl={profile.animon.name}
        />
      ))}

      {profiles.length < 3 && <ProfileCreateBox onClick={handleModalOpen} />}
      {isModalOpen && (
        <CreateModal onClose={handleModalClose} resetList={resetList} />
      )}
    </ProfileListBox>
  );
};

export default ProfileList;
