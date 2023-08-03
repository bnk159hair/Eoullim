import React, {useState} from 'react';
import ProfileList from '../../components/Profile/ProfileList';
import {ProfileSelectPageContainer} from './ProfileSelect.styles'
import ChagePasswordModal from '../../components/Profile/ChagePasswordModal';

const ProfileSelect = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
      };
    
      const handleModalClose = () => {
        setModalOpen(false);
      };
    
    return (
        <ProfileSelectPageContainer>
            <button onClick={handleModalOpen}>회원정보수정</button>
            {isModalOpen && <ChagePasswordModal onClose={handleModalClose} />}
            <ProfileList/>
            <button>로그아웃</button>
        </ProfileSelectPageContainer>
    );
};

export default ProfileSelect;
