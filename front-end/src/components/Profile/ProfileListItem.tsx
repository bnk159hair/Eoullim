import React,{useState} from 'react';
import { ProfileUsereBox } from './profileListItem.styles';
import ModifyModal from './ModifyModal';
import { useNavigate } from 'react-router-dom';

interface ProfileListItemProps {
  name: string;
  ChildId: number
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({name,ChildId}) => {
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
        {name}
        {ChildId}
      </ProfileUsereBox>
        <button onClick={handleModalOpen} >수정</button>
        {isModalOpen && <ModifyModal onClose={handleModalClose} ChildId={ChildId}/>}
        <button>삭제</button>
        <button onClick={handleRecordClick}>녹화영상</button>
    </div>
  );
};


export default ProfileListItem;
