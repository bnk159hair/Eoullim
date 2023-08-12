import styled from "styled-components";

export const Canvas = styled.canvas<{ videoState: boolean }>`
  width: 1000;
  height: 400;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  visibility: ${(props) => (props.videoState ? "hidden" : "visible")};
  z-index: 9999;
`;

export const Video = styled.video<{ videoState: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  visibility: ${(props) => (props.videoState ? "visible" : "visible")};
  z-index: 2000;
`;
