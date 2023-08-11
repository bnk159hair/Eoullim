import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOverlay, ModalContent, Accept,Refuse,FlexContent,AlarmMessage } from './AlarmModalStyles';
import { useRecoilState } from 'recoil';
import { invitationSessionId } from '../../atoms/Ivitation';

interface AlarmModalProps {
  sessionId: string;
  userName: string;
  onClose: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ sessionId, onClose,userName }) => {
  const navigate = useNavigate();

  const [invitationId, setInvitationId] = useRecoilState(invitationSessionId);

  const acceptInvitation = () => {
    setInvitationId(sessionId);
    navigate(`/friendsession`);
  };

  return (
    <>
      <ModalOverlay onClick={onClose}>
      <ModalContent>
        <AlarmMessage>
        {userName}님이 초대를 보내셨습니다
        </AlarmMessage>
        <FlexContent>
          <Accept onClick={acceptInvitation}/>
          <Refuse onClick={onClose}/>
        </FlexContent>
      </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default AlarmModal;
