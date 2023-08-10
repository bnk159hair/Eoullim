import React from 'react';
import { FriendCard, FriendImg, FrinedInfo } from './FriendsListItemStyles';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';

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

  const myName = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const profileKey = useRecoilValue(Profilekey);

  const handleInvite = () => {
    console.log(friendId, myName);
    axios
      .post(
        'https://i9c207.p.ssafy.io/api/v1/meetings/friend/start',
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
      .then((response) => console.log(response))
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
