import React from 'react';
import MyFriendsList from '../../components/MyFriends/MyFriendsList';
import { useNavigate } from 'react-router-dom'

const Friends = () => {

    const navigate = useNavigate();
    
    const handleMainClick = () => {
        navigate('/'); 
      };

    return (
        <div>
            내친구 목록
            <MyFriendsList/>
            <button onClick={handleMainClick}>뒤로 가기</button>
        </div>
    );
};

export default Friends;