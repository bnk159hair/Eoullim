import { useRef, useEffect } from 'react';
import './StreamComponent.css';

const OvVideoComponent = (user: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (user && user.streamManager && videoRef.current) {
      console.log('PROPS: ', user);
      user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (user && user.streamManager.session && user && videoRef.current) {
      user.streamManager.session.on('signal:userChanged', (event: any) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (videoRef.current) {
      user.getStreamManager().addVideoElement(videoRef.current);
    }
  }, [user]);

  return (
    <video
      autoPlay={true}
      id={'video-' + user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={false}
    />
  );
};

export default OvVideoComponent;
