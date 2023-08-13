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
}

const EndModal: React.FC<EndModalProps> = ({ onClose, message, isFriend }) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <EndMessage>{message}</EndMessage>
          <FlexContent>
            {!isFriend ? (
              <>
                <Accept onClick={onClose} />
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
