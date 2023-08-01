import React,{useState} from 'react';
import ProfileListItem from './ProfileListItem';
import {ProfileCreateBox} from './profile.styles'
import CreateModal from './CreateModal';

const ProfileList = () => {
    
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleModalOpen = () => {
        setModalOpen(true);
      };
    
    const handleModalClose = () => {
        setModalOpen(false);
      };

    return (
        <div>
            <button>회원정보수정</button>
            <ProfileListItem/>
            <ProfileCreateBox onClick={handleModalOpen}/>
            {isModalOpen && <CreateModal onClose={handleModalClose} />}
        
        </div>
    );
};

export default ProfileList;