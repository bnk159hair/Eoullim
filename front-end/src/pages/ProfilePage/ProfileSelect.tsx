import React from 'react';
import ProfileList from '../../components/Profile/ProfileList';
import {ProfileSelectPageContainer} from './ProfileSelect.styles'

const ProfileSelect = () => {
    return (
        <ProfileSelectPageContainer>
            <button>회원정보수정</button>
            <ProfileList/>
            <button>로그아웃</button>
        </ProfileSelectPageContainer>
    );
};

export default ProfileSelect;
