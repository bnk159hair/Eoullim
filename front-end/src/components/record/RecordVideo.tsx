import React from 'react';
import { ModalOverlay, ModalContent,HeaderContainer,FormContainer,VideoInfo} from './RecordVideoStyles';
import CloseIcon from "@mui/icons-material/Close";
import {
    IconButton,
  } from "@mui/material";


interface VideoModalProps {
  onClose: () => void;
  videoPath: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose, videoPath }) => {



  return (
    <>
      <ModalOverlay>
        <ModalContent>
            <HeaderContainer>
            <IconButton onClick={onClose}>
                <CloseIcon fontSize="large" />
            </IconButton>
            </HeaderContainer>
            <FormContainer>
            <video controls>
                <source src={videoPath} type="video/webm" />
            </video>
            <VideoInfo>
                정보
                텍스트 
                5:00
                텍스트 
                4:00
            </VideoInfo>
            </FormContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default VideoModal;
