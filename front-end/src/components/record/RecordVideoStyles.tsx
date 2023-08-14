import styled from 'styled-components';
import box from '../../assets/box/woodbox.jpg'
import videoinfo from '../../assets/box/recordvideo.png'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  
  width: 1400px;
  height: 600px;
  border: 2px solid;
  padding: 20px;
  z-index: 1001;
//   display: flex;
//   justify-content: space-evenly;
  border-radius: 25px;
//   align-items: center;
  background-image: url(${box});
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const VideoInfo = styled.div`
    background-image: url(${videoinfo});
    background-size: 100% 100%;
    width: 700px;
    height: 500px;
`;