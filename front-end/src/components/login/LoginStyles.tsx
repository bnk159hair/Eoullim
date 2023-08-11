import styled, { keyframes } from 'styled-components';
import LoginBox from '../../assets/box/loginbox.png';

export const FormContainer = styled.form`
  width: 565px;
  height: 320px;
  padding: 30px;
  background-size: cover;
  background-image: url(${LoginBox});
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 80%;
  height: 15%;
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  outline: none;
  color: #fefefe;
  background-color: #b6d36f;
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

export const SignupContainer = styled.div`
  position: absolute;
  left: 40%;
  top: 80%;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
`;

export const SignupAnchor = styled.button`
  margin-left: 10px;
  font-weight: bold;
  color: #f5ebc9;
  text-decoration: underline;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  &:hover,
  &:focus,
  &:link:hover,
  &:link:focus,
  &:visited:hover,
  &:visited:focus {
    animation: ${gelatineAnimation} 0.5s 1;
  }
`;
