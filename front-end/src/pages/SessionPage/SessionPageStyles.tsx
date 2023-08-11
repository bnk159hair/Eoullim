import { styled } from 'styled-components';
import loginBackground from '../../assets/background/login.gif';

export const SessionPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${loginBackground});
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const MainWrapper = styled.div`
  width: 65%;
`;

export const SideBar = styled.div`
  width: 35%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const YourVideo = styled.div`
  width: 90%;
  height: 85%;
  margin: 1rem;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Character = styled.div`
  width: 70%;
  height: 40%;
  margin: 30px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyVideo = styled.div`
  width: 100%;
  height: 40%;
  background-color: grey;
`;

export const Buttons = styled.div`
  width: 80%;
  height: 10%;
  background-color: grey;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
