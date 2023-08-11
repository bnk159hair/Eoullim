import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOverlay, ModalContent } from './AnimonModalStyles';
import { useRecoilState } from 'recoil';
import { invitationSessionId } from '../../atoms/Ivitation';

interface AlarmModalProps {
  sessionId: string;
  onClose: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ sessionId, onClose }) => {
  const navigate = useNavigate();

  const [invitationId, setInvitationId] = useRecoilState(invitationSessionId);

  const acceptInvitation = () => {
    setInvitationId(sessionId);
    navigate(`/friendsession`);
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
