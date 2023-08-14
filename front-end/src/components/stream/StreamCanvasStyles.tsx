import styled from 'styled-components';

export const Canvas = styled.canvas<{ videoState: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  visibility: ${(props) => (props.videoState ? 'hidden' : 'visible')};
  z-index: 2001;
`;

export const Video = styled.video<{ videoState: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  z-index: 2000;
`;

export const UserName = styled.div`
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  padding: 0.25rem 0.7rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 10%;
  z-index: 2001;
`;
