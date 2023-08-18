import styled from 'styled-components';

export const SpinnerContainer = styled.div<{ isAnimonLoaded: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isAnimonLoaded ? 'hidden' : 'visible')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2002;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 2%;
`;

export const Spinner = styled.div`
  position: relative;
`;

export const AnimalEmoji = styled.span`
  font-size: 80px;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
