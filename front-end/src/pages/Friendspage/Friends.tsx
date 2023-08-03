import React from 'react';
import MyFriendsList from '../../components/MyFriends/MyFriendsList';
import { useNavigate } from 'react-router-dom'
import {FriendsPageContainer} from './Friends.styles'

const Friends = () => {

    const navigate = useNavigate();
    
    const handleMainClick = () => {
        navigate('/'); 
      };

    return (
        <FriendsPageContainer>
            내친구 목록
            <MyFriendsList/>
            <button onClick={handleMainClick}>뒤로 가기</button>
        </FriendsPageContainer>
    );
};

export default Friends;