import { FC } from 'react';
import { useRef } from 'react';
import { useFaceMask } from '../../hooks/useFaceMesh';
import { StreamManager } from 'openvidu-browser';
import { useStream } from '../../hooks/useStream';

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
  console.log(avatarPath);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus } = useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  return (
    <div>
      <canvas
        id="faceCanvas"
        ref={canvasRef}
        tabIndex={1}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          objectFit: 'cover',
          borderRadius: '10px',
          visibility: !videoState ? 'visible' : 'hidden',
        }}
      />
      <video
        id="streamVideo"
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '10px',
          objectFit: 'cover',
          visibility: videoState ? 'visible' : 'hidden',
        }}
      />
      <p>{name}</p>
    </div>
  );
};

export default StreamCanvas;
