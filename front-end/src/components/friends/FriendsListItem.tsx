import React from 'react';

interface FriendsListItemProps {
  name: string;
  ChildId: number;
  imgurl: string;
}

const FriendsListItem: React.FC<FriendsListItemProps> = ({
  name,
  ChildId,
  imgurl,
}) => {
  return( 
  <div>
    {name}
    {ChildId}
    {imgurl}

  </div>);
};

export default FriendsListItem;
