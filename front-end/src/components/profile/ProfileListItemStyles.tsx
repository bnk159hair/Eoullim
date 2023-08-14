import styled from 'styled-components';
import nametag from '../../assets/ecc/nametag.png';

export const ProfileUserContainer = styled.div`
  width: 300px;
  height: 300px;
  background-size: 100% 100%;
  background-color: #fbe9a2;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: relative;
  z-index: 1;

  &:hover {
    transform: scale(1.25);
  }
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;
