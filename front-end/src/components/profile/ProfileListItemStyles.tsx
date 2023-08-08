import styled from 'styled-components';
import ProfileBox from '../../assets/ecc/profile.png';
import nametag from '../../assets/ecc/nametag.png'

export const ProfileUsereBox = styled.div`
  height: 300px;
  width: 300px;
  background-size: 100% 100%;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
  border-radius: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center; /* 변경된 부분 */
`;

export const NameTag = styled.div`
  height: 58px;
  width: 200px;
  background-size: 100% 100%;
  background-image: url(${nametag});
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold; 
  
`