import styled from 'styled-components';
import CreateBox from '../../assets/ecc/createprofile.png';

export const ProfileCreateBox = styled.div`
  height: 300px;
  width: 300px;
  background-image: url(${CreateBox});
  background-size: cover;
  border-radius: 5%;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.25);
  }
`;

export const ProfileListBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: start;
`;
