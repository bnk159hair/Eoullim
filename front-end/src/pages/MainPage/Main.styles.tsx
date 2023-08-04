import styled from 'styled-components';
import tw from 'twin.macro';
import mainBackground from '../../assets/background/main.gif'; // 이미지를 import 해옵니다.

export const MainPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${mainBackground}); // 이미지 경로를 문자열로 감싸줍니다.
  display: flex;
  justify-content: center;
  align-items: center;
`;
