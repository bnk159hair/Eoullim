import { styled, css } from 'styled-components';

const Border = css`
  border: 1px solid black;
`;

export const Container = styled.div`
  display: flex;
  width: 99vw;
  height: 99vh;
`;

export const MainWrapper = styled.div`
  width: 65%;
`;

export const SideBar = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const YourVideo = styled.div`
  width: 90%;
  height: 80%;
  margin: 30px;
  background-color: grey;
  ${Border}
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Character = styled.div`
  width: 70%;
  height: 40%;
  margin-top: 30px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyVideo = styled.div`
  width: 100%;
  height: 40%;
  background-color: grey;
  ${Border}
`;

export const Buttons = styled.div`
  width: 80%;
  height: 10%;
  background-color: grey;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${Border}
`;
