import React, { useState, useEffect } from 'react';
import FriendsListItem from './FriendsListItem';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue } from 'recoil';
import { EmptyFriend } from './FriendsListStyles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface FriendsProfile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
  animon: { id: number; imagePath: string; name: string };
}

const FriendsList = () => {
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);
  const [friends, setFriends] = useState<FriendsProfile[]>([]);

  const getFriends = () => {
    axios
      .get(`${API_BASE_URL}/friendship/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.result;
        setFriends(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('친구목록불러오기오류', error);
      });
  };
  useEffect(() => {
    getFriends();
  }, [profileId, token]);

  return (
    <div>
      {friends.length > 0 ? (
        <Carousel width="300px">
        {friends.map((friend) => (
          <FriendsListItem
            key={friend.id}
            name={friend.name}
            animon={friend.animon.name}
          />
        ))}
        </Carousel>
      ) : (
        <EmptyFriend />
      )}
    </div>
  );
};

export default FriendsList;
