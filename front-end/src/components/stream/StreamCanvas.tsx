import React, { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFaceMask } from '../../hooks/useFaceMesh';
import { StreamManager } from 'openvidu-browser';
import { useStream } from '../../hooks/useStream';
import { useRecoilValue } from 'recoil';
import {
  PublisherId,
  SubscriberId,
  PublisherVideoStatus,
  SubscriberVideoStatus,
} from '../../atoms/Session';

interface IProps {
  streamManager: StreamManager;
  id: number;
  avatarPath: string;
  videoState: boolean;
}

export const StreamCanvas: FC<IProps> = ({
  streamManager,
  id,
  avatarPath,
  videoState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus } = useStream(streamManager);
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
          visibility: videoState ? 'visible' : 'hidden',
        }}
      />
      <canvas
        id="faceCanvas"
        ref={canvasRef}
        tabIndex={1}
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          objectFit: 'cover',
          borderRadius: '10px',
          visibility: !videoState ? 'visible' : 'hidden',
        }}
      />
      <p>{id}</p>
    </div>
  );
};

export default StreamCanvas;
