import React from "react";
import {
  ModalOverlay,
  ModalContent,
  Accept,
  Refuse,
  FlexContent,
  EndMessage,
} from "./EndModalStyles";

interface EndModalProps {
  message: string;
  onClose: () => void;
  isFriend: boolean;
  addFriend: ()=>void;
}

const EndModal: React.FC<EndModalProps> = ({ onClose, message, isFriend,addFriend }) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <EndMessage>{message}</EndMessage>
          <FlexContent>
            {!isFriend ? (
              <>
                <Accept onClick={addFriend} />
                <Refuse onClick={onClose} />
              </>
            ) : (
              <Refuse onClick={onClose} />
            )}
          </FlexContent>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default EndModal;
