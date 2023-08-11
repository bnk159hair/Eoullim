import { styled } from 'styled-components';
import loginBackground from '../../assets/background/login.gif';
const IMGURL = '/bear.png';

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
  background-image: url(${IMGURL});
  width: 55%;
  height: 40%;
  margin: 3% 9% 3% 0;
  // margin-right: 40px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyVideo = styled.div`
  width: 100%;
  height: 45%;
  background-color: grey;
`;

export const NavContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
`;
