import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';

export const useStream = (streamManager: StreamManager) => {
  console.log(12312312312321312321312321, streamManager);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(
    streamManager.stream.audioActive
  );
  const [videoStatus, setVideoStatus] = useState<boolean>(
    streamManager.stream.videoActive
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

      if (event.changedProperty === 'videoActive') {
        setVideoStatus(event.newValue as boolean);
      } else if (event.changedProperty === 'audioActive') {
        setMicStatus(event.newValue as boolean);
      }
    });
  }, [streamManager]);

  return {
    speaking,
    micStatus,
    videoStatus,
    videoRef,
  };
};
