import { useEffect, useRef } from 'react';

const OpenViduVideoComponent = ({ streamManager }: any) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay ref={videoRef} />;
};

export default OpenViduVideoComponent;
