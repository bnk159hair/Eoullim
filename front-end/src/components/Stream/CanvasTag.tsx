import React, { FC } from 'react';
import { useRef } from 'react';
import { useFaceMask } from '../../hooks/useFaceMesh';
import { StreamManager } from 'openvidu-browser';
import { useStream } from '../../hooks/useStream';

interface IProps {
  streamManager: StreamManager;
  name: string;
  avatarPath: string;
  balance?: boolean;
}

export const CanvasTag: FC<IProps> = ({ streamManager, name, avatarPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus, videoStatus } =
    useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);
  return (
    <div>
      <video
        id="streamVideo"
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
      <canvas
        id="faceCanvas"
        ref={canvasRef}
        tabIndex={1}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      <p>{name}</p>
    </div>
  );
};

export default CanvasTag;
