import { styled, keyframes, css } from 'styled-components';
import loginBackground from '../../assets/background/login.gif';
import click from '../../assets/ecc/click.png';
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

export const CharacterContainer = styled.div`
  width: 17%;
  height: 40%;
  position: absolute;
  top: 47%;
  left: 49%;
  transform: translate(-50%, -50%);
  z-index: 2005;
`;

export const Character = styled.div<{ isPlaying: boolean }>`
  background-image: url(${IMGURL});
  width: 100%;
  height: 100%;
  margin-right: 1%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isPlaying &&
    css`
      animation: ${gelatineAnimation} 0.5s infinite;
    `}
`;

export const MyVideo = styled.div`
  width: 100%;
  height: 85%;
  margin: 0.5rem;
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
