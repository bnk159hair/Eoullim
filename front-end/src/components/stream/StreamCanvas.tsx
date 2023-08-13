import { FC } from "react";
import { useRef } from "react";
import { useFaceMask } from "../../hooks/useFaceMesh";
import { StreamManager } from "openvidu-browser";
import { useStream } from "../../hooks/useStream";
import { Canvas, UserName, Video } from "./StreamCanvasStyles";

interface IProps {
  streamManager: StreamManager;
  name: string;
  avatarPath: string;
  videoState: boolean;
}

export const StreamCanvas: FC<IProps> = ({
  streamManager,
  name,
  avatarPath,
  videoState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus } = useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  return (
    <>
      <Canvas ref={canvasRef} tabIndex={1} videoState={videoState}></Canvas>
      <Video ref={videoRef} videoState={videoState}></Video>
      <UserName>{name}</UserName>
    </>
  );
};

export default StreamCanvas;
