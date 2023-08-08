import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';

export const useStream = (streamManager: StreamManager) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(
    streamManager.stream.audioActive
  );

  useEffect(() => {
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current as HTMLVideoElement);
    }

    streamManager.on('publisherStartSpeaking', (event) => {
      if (event.streamId !== streamManager.stream.streamId) {
        return;
      }
      setSpeaking(true);
    });

    streamManager.on('publisherStopSpeaking', (event) => {
      if (event.streamId !== streamManager.stream.streamId) {
        return;
      }
      setSpeaking(false);
    });

    streamManager.on('streamPropertyChanged', (event) => {
      if (event.stream.streamId !== streamManager.stream.streamId) {
        return;
      }

      if (event.changedProperty === 'audioActive') {
        setMicStatus(event.newValue as boolean);
      }
    });
  }, [streamManager]);

  return {
    speaking,
    micStatus,
    videoRef,
  };
};
