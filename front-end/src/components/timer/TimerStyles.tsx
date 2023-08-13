import styled from 'styled-components';

export const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 60px;
  font-size: 32px;
  text-align: center;
  padding-top: 34px;
`;

export const Spinner = styled.div`
  position: relative;
`;

export const AnimalEmoji = styled.span`
  font-size: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
