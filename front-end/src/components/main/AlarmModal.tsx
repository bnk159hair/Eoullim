import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ModalOverlay,
  ModalContent,
} from './AnimonModalStyles';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';
import { getFriendSessionToken } from '../../apis/openViduApis';

interface AlarmModalProps {
    sessionId: string;
    onClose: () => void;
  }

  const AlarmModal: React.FC<AlarmModalProps> = ({ sessionId, onClose }) => {

    const navigate = useNavigate();
  const profileId = useRecoilValue(Profilekey);
  const userToken = useRecoilValue(tokenState);

  const acceptInvitation = () => {
    navigate(`/friendsession/${sessionId}`)
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <button onClick={acceptInvitation}>수락</button>
        <button onClick={onClose}>거절</button>
      </ModalContent>
    </>
  );
};

export default AlarmModal;
