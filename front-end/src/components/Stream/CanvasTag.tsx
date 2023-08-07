import React, { FC } from 'react';
import { useRef, useState } from 'react';
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
  name: string;
  avatarPath: string;
  balance?: boolean;
}

export const CanvasTag: FC<IProps> = ({ streamManager, name, avatarPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoState, setVideoState] = useState<boolean>(false);
  const publisherId = useRecoilValue(PublisherId);
  const subscriberId = useRecoilValue(SubscriberId);
  const publisherVideoState = useRecoilValue(PublisherVideoStatus);
  const subscriberVideoState = useRecoilValue(SubscriberVideoStatus);
  const { videoRef, speaking, micStatus } = useStream(streamManager);
  useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  if (name === publisherId) {
    setVideoState(publisherVideoState);
  } else if (name === subscriberId) {
    setVideoState(subscriberVideoState);
  }

  return (
    <div>
      <video
        id="streamVideo"
        ref={videoRef}
        hidden={videoState}
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
        hidden={!videoState}
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
