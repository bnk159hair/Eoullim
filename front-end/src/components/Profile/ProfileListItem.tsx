import React from 'react';
import { ProfileUsereBox } from './profileListItem.styles';

interface ProfileListItemProps {
  name: string;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({ name }) => {
  return (
    <ProfileUsereBox>
      {name}
    </ProfileUsereBox>
  );
};

export default ProfileListItem;
