import React from 'react';
import { ModalOverlay, ModalContent } from './AnimonModal.styles';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import axios from 'axios';
import { BASEURL } from '../../apis/api';

interface AnimonModalProps {
  onClose: () => void;
  profile: () => void;
}

const AnimonModal: React.FC<AnimonModalProps> = ({ onClose, profile }) => {
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);

  const changeAnimon = (id:number) => {
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
        <div onClick={() => changeAnimon(1)}>애니몬 버튼1</div>
        <div onClick={() => changeAnimon(2)}>애니몬 버튼2</div>
        <div onClick={() => changeAnimon(3)}>애니몬 버튼3</div>
        <div onClick={() => changeAnimon(4)}>애니몬 버튼4</div>
      </ModalContent>
    </>
  );
};

export default AnimonModal;
