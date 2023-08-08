import styled from 'styled-components';
import cat from '../../assets/animon/cat.png'
import tiger from '../../assets/animon/tiger.png'
import dog from '../../assets/animon/dog.png'
import panda from '../../assets/animon/panda.png'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1001;
`;

export const Cat = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${cat});
  background-size: cover;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
` 
export const Tiger = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${tiger});
  background-size: cover;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
` 
export const Dog = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${dog});
  background-size: cover;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
` 
export const Panda = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${panda});
  background-size: cover;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
` 