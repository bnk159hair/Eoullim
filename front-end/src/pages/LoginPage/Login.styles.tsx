import styled from "styled-components";
import tw from "twin.macro";
import loginBackground from "../../assets/background/login.gif"; // 이미지를 import 해옵니다.

export const LoginPageContainer = styled.div`
    height: 100vh;
    background-size: 100% 100%;
    background-attachment: scroll;
    background-image: url(${loginBackground}); // 이미지 경로를 문자열로 감싸줍니다.
`;
export const LoginTagContainer = styled.div`
  position: absolute; /* LoginTag를 원하는 위치로 이동시키기 위해 설정합니다. */
  top: 150px; /* 위에서 50px 만큼 떨어진 위치에 배치합니다. */
  left: 70px; /* 왼쪽에서 50px 만큼 떨어진 위치에 배치합니다. */
`;
