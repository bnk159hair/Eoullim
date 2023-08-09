import styled from 'styled-components';
import friendBackground from '../../assets/background/friend.jpg'; // 이미지를 import 해옵니다.
import back from '../../assets/ecc/back.png';

export const FriendsPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${friendBackground});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BackIcon = styled.div`
  background-size: 100% 100%;
  cursor:pointer;
  width: 80px;
  height: 80px;
  background-image: url(${back});
  position: absolute; 
  top: 20px; 
  left: 20px; 
`