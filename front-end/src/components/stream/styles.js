import styled from "styled-components";

export const NicknameWrapper = styled.div`
  background: rgba(58, 64, 74, 0.651);
  padding: 5px !important;
  position: absolute;
  z-index: 999;
  color: #ffffff;
`;

export const FormControl = styled.div`
  color: black;
`;

export const Pointer = styled.div`
  cursor: pointer;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: -3px;
  right: 0;
  z-index: 999;
`;

export const NameErrorText = styled.div`
  color: #fd6d5f;
  font-weight: bold;
  text-align: center;
`;

export const NicknameForm = styled.div`
  padding: 10px;
`;

export const Fullscreen = styled.div`
  top: 40px;
`;

export const StreamComponentWrapper = styled.div`
  height: 100%;
`;

export const VideoElement = styled.video`
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  height: 100%;
  color: #ffffff;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: Arial, Helvetica, sans-serif;
`;

export const StatusIcons = styled.div`
  bottom: 0;
  background: #c71100;
  width: 40px;
  height: fit-content;
  position: absolute;
  color: #ffffff;
`;

export const IconContainer = styled.div`
  text-align: center;
  padding: 6px;
`;

export const FullscreenButton = styled.div`
  position: absolute;
  bottom: 1px;
  right: 1px;
  z-index: 1000;
  background-color: #000000c4;
`;

export const VolumeButton = styled.div`
  background-color: #000000c4;
  position: absolute;
  bottom: 45px;
  right: 1px;
  z-index: 1000;
  color: #ffffff;
`;

export const WidgetContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

export const Input = styled.input`
  color: white;
`;

export const Label = styled.label`
  color: white;
`;
