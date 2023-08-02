import React,{useState} from 'react';
import { ProfileUsereBox } from './profileListItem.styles';
import ModifyModal from './ModifyModal';
import { useNavigate } from 'react-router-dom';

// interface ProfileListItemProps {
//   name: string;
// }

const ProfileListItem: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMainClick = () =>{
    navigate('/'); 
  };

  const handleRecordClick = () =>{
    navigate('/record')
  }

  return (
    <div>
      <ProfileUsereBox onClick={handleMainClick}>
        이름
      </ProfileUsereBox>
        <button onClick={handleModalOpen} >수정</button>
        {isModalOpen && <ModifyModal onClose={handleModalClose} />}
        <button>삭제</button>
        <button onClick={handleRecordClick}>녹화영상</button>
    </div>
  );
};

// const ProfileListItem: React.FC<ProfileListItemProps> = ({ name }) => {
//   return (
//     <ProfileUsereBox>
//       {name}
//     </ProfileUsereBox>
//   );
// };

export default ProfileListItem;
