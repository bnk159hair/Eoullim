import styled from 'styled-components';
import mainBackground from '../../assets/background/main.gif'; // 이미지를 import 해옵니다.
import profileimg from '../../assets/ecc/profile.png'

export const MainPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${mainBackground}); // 이미지 경로를 문자열로 감싸줍니다.
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProfileImg = styled.div`
  background-size: 100% 100%;
  width: 80px;
  height: 80px;
  margin-left: auto;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
`;

export const MarginContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const MainCharacter = styled.div`
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
`