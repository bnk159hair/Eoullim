import styled from 'styled-components';
import loginBackground from '../../assets/background/login.gif';
import logo from '../../assets/logo.png';

export const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${loginBackground});
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const LoginContainer = styled.div`
  position: relative;
`;

export const ImageContainer = styled.div``;

export const Logo = styled.div`
  // position: absolute;
  // top: 100px;
  // right: 180px;
  width: 450px;
  height: 130px;
  background-size: 100% 100%;
  background-image: url(${logo});
`;
