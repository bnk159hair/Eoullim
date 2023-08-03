import styled from 'styled-components';
import loginBackground from '../../assets/background/login.gif'; // 이미지를 import 해옵니다.

export const ProfileSelectPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${loginBackground}); // 이미지 경로를 문자열로 감싸줍니다.
`;
