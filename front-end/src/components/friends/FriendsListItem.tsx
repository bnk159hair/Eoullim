import React from 'react';
import { FriendCard, FriendImg, FrinedInfo } from './FriendsListItemStyles';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { API_BASE_URL } from '../../apis/urls';
import { useNavigate } from 'react-router-dom';

interface FriendsListItemProps {
  friendId: number;
  friendName: string;
  animon: string;
}

const FriendsListItem: React.FC<FriendsListItemProps> = ({
  friendId,
  friendName,
  animon,
}) => {
  const IMGURL = `/${animon}.png`;
  const navigate = useNavigate();

  const myName = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const profileKey = useRecoilValue(Profilekey);

  const handleInvite = () => {
    console.log(friendId, myName);
    axios
      .post(
        `${API_BASE_URL}/meetings/friend/start`,
        {
          childId: profileKey,
          friendId: friendId, // 친구 아이디
          name: myName, // 내 이름
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const {sessionId, token} = response.data
        navigate(`/friendsession/${sessionId}`)
      })
      .catch((error) => console.log(error));
  };

  return (
    <FriendCard>
      <FriendImg style={{ backgroundImage: `url(${IMGURL})` }} />
      <FrinedInfo>
        <div>친구 이름 : {friendName}</div>
        <button onClick={handleInvite}>초대하기</button>
      </FrinedInfo>
    </FriendCard>
  );
};

export default FriendsListItem;
