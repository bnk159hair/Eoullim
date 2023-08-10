import styled from 'styled-components';
import nametag from '../../assets/ecc/nametag.png';

export const ProfileContainer = styled.div`
  border: 5px solid black;
`;

export const ProfileUserContainer = styled.div`
  width: 300px;
  height: 300px;
  background-size: 100% 100%;
  background-color: #87cefa;
  border-radius: 5%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export const NameTag = styled.div`
  width: 200px;
  height: 58px;
  padding-right: 1.5rem;
  background-size: 100% 100%;
  background-image: url(${nametag});
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
