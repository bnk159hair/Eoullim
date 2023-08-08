import React from 'react';
import {FriendCard,FriendImg,FrinedInfo} from './FriendsListItemStyles'

interface FriendsListItemProps {
  name: string;
  animon: string;
}

const FriendsListItem: React.FC<FriendsListItemProps> = ({
  name,
  animon,
}) => {

  const IMGURL = `/${animon}.png`

  return( 
  <FriendCard>
    <FriendImg style={{ backgroundImage: `url(${IMGURL})` }}/>
    <FrinedInfo>
      <div>친구 이름 : {name}</div>
    </FrinedInfo>
  </FriendCard>);
};

export default FriendsListItem;
