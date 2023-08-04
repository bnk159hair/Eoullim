import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
