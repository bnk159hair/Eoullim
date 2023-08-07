import styled, { keyframes } from 'styled-components';
import LoginBox from '../../assets/box/loginbox.png';

export const FormContainer = styled.div`
  width: 560px;
  height: 320px;
  padding: 30px;
  background-size: cover;
  background-image: url(${LoginBox});
  display: flex;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

export const LoginButton = styled.button`
  width: 100px;
  height: 70px;
  // background-color: #b6d36f;
  // color: #fff;
  // font-weight: bold;
  // padding: 0.5rem 1rem 0.5rem 1rem;
  // border: none;
  // border-radius: 0.25rem;
  // cursor: pointer;
  border: none;
  outline: none;
  color: #fefefe;
  background-color: #9b59b6;
  border-radius: 3px;
  cursor: pointer;
  transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);

  &:hover,
  &:focus,
  &:link:hover,
  &:link:focus,
  &:visited:hover,
  &:visited:focus {
    animation: ${gelatineAnimation} 0.5s 1;
  }
`;

export const SignupButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 20px;
  background-color: #b6d36f;
  color: #fff;
  font-weight: bold;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;
