import styled from 'styled-components';
import friendBackground from '../../assets/background/friend.jpg'; // 이미지를 import 해옵니다.

export const FriendsPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${friendBackground});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
