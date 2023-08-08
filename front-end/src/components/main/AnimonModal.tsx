import React from 'react';
import { ModalOverlay, ModalContent,Cat,Dog,Panda,Tiger } from './AnimonModalStyles';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import axios from 'axios';
import { BASEURL } from '../../apis/urls';

interface AnimonModalProps {
  onClose: () => void;
  profile: () => void;
}

const AnimonModal: React.FC<AnimonModalProps> = ({ onClose, profile }) => {
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);

  const changeAnimon = (id: number) => {
    axios
      .get(`${BASEURL}/children/${profileId}/animons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onClose();
        profile();
        console.log('바꾸기 완료');
      })
      .catch((error) => {
        console.log('바꾸기 요청 오류', error);
      });
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <Panda onClick={() => changeAnimon(1)}></Panda>
        <Dog onClick={() => changeAnimon(2)}></Dog>
        <Cat onClick={() => changeAnimon(3)}></Cat>
        <Tiger onClick={() => changeAnimon(4)}></Tiger>
      </ModalContent>
    </>
  );
};

export default AnimonModal;
