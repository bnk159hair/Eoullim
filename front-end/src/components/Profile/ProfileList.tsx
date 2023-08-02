import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileListItem from './ProfileListItem';
import { ProfileCreateBox,ProfileListBox } from './profileList.styles';
import CreateModal from './CreateModal';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';


interface Profile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
}

const ProfileList: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const BASEURL = 'http://localhost:8080/api/v1';
  const token = useRecoilValue(tokenState);
  

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    axios
      .get<{ resultCode: string; result: Profile[] }>(`${BASEURL}/children`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.result;
        setProfiles(data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  });

  return (
    <ProfileListBox>
      <ProfileListItem/>
      {/* {profiles.map((profile) => (
        <ProfileListItem key={profile.id} name={profile.name} />
      ))} */}
      {profiles.length < 3 && <ProfileCreateBox onClick={handleModalOpen} />}
      {isModalOpen && <CreateModal onClose={handleModalClose} />}
    </ProfileListBox>
  );
};

export default ProfileList;
