import { styled, keyframes,css } from "styled-components";
import loginBackground from "../../assets/background/login.gif";
import click from "../../assets/ecc/click.png";
const IMGURL = "/bear.png";

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
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;


const gelatineAnimation = keyframes`
  from, to {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
  from, to {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
`;

export const Character = styled.div<{ isPlaying: boolean }>`
  background-image: url(${IMGURL});
  width: 55%;
  height: 40%;
  margin: 3% 9% 3% 0;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${props =>
    props.isPlaying &&
    css`
      animation: ${gelatineAnimation} 0.5s infinite;
    `}
`;

export const MyVideo = styled.div`
  width: 100%;
  height: 45%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  position: relative;
`;

export const NavContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  position: absolute;
  bottom: 0;
  background-color: rgba(50, 50, 50, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
`;

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

export const Click = styled.div`
  width: 90px;
  height: 90px;
  background-image: url(${click});
  background-size: cover;
  animation: ${blinkAnimation} 1s infinite;
`;
