import styled from 'styled-components';
import box from '../../assets/box/woodbox.jpg'
import accept from '../../assets/ecc/accept.png'
import refuse from '../../assets/ecc/refuse.png'
import message from '../../assets/box/alam.png'

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
  
  width: 500px;
  height: 300px;
  // background-color: white;
  border: 2px solid;
  padding: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 25px;
  align-items: center;
  background-image: url(${box});
`;

export const Accept = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${accept});
  background-size: cover;
  cursor:pointer;
  &:hover {
    transform: scale(1.25);
  }
` 

export const Refuse = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${refuse});
  background-size: cover;
  cursor:pointer;
  &:hover {
    transform: scale(1.25);
  }
` 

export const FlexContent = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`
export const AlarmMessage = styled.div`
  width: 400px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${message});
  background-size: cover;
  font-family: 'HakgyoansimBunpilR';
  font-size: 30px;
`