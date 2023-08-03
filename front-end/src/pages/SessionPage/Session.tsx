import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { CanvasTag } from '../../components/stream/CanvasTag';
import { ControlBar } from '../../components/stream/ControlBox';
import { useWebSocket } from '../../hooks/useWebSocket';

const Session = () => {
  const navigate = useNavigate();

  console.log('오픈비두 시작');
  const userId = 'user01';
  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } =
    useOpenVidu(userId);
  const leaveSession = async () => {
    navigate('/');
  };

  return (
    <div>
      {publisher
        ? streamList.map((stream, idx) =>
            stream.streamManager ? (
              <div key={idx} className="stream-container col-md-6 col-xs-6">
                {stream.streamManager === publisher ? <h1>MyVideo</h1> : null}
                {stream.streamManager !== publisher ? (
                  <h1>FriendVideo</h1>
                ) : null}
                <CanvasTag
                  streamManager={stream.streamManager}
                  name={stream.userId}
                  avatarPath="http://localhost:3000/image.png"
                />
              </div>
            ) : null
          )
        : null}
      <h1>Character</h1>
      <ControlBar
        onChangeMicStatus={onChangeMicStatus}
        onChangeCameraStatus={onChangeCameraStatus}
      />
    </div>
  );
};

export default Session;
