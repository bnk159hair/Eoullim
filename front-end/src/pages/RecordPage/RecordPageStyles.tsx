import styled from 'styled-components';
import recordBackground from '../../assets/background/record.gif';
import emptyrecord from '../../assets/ecc/emptyrecord.png';
import back from '../../assets/ecc/back.png';

export const RecordPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${recordBackground});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackIcon = styled.div`
  background-size: 100% 100%;
  cursor: pointer;
  width: 80px;
  height: 80px;
  background-image: url(${back});
  position: absolute;
  top: 20px;
  left: 20px;
  &:hover {
    transform: scale(1.1);
  }
`;

export const EmptyRecord = styled.div`
  height: 400px;
  width: 800px;
  background-image: url(${emptyrecord});
  background-size: 100% 100%;
`;

export const Scroll = styled.div`
  height: 600px;
  width: 900px;
  overflow: auto;
`;
