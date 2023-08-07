import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { CanvasTag } from '../../components/stream/CanvasTag';
import { ControlBar } from '../../components/stream/ControlBox';
import { useWebSocket } from '../../hooks/useWebSocket';
import {
  PublisherId,
  SubscriberId,
  PublisherVideoStatus,
  SubscriberVideoStatus,
} from '../../atoms/Session';
import { useRecoilState } from 'recoil';

const Session = () => {
  console.log('오픈비두 시작');
  const [publisherId, setPublisherId] = useRecoilState(PublisherId);
  const [publisherVideoStatus, setPublisherVideoStatus] =
    useRecoilState(PublisherVideoStatus);
  const [subscriberId, setSubscriberId] = useRecoilState(SubscriberId);
  const [subscirberVideoStatus, setSubscirberVideoStatus] = useRecoilState(
    SubscriberVideoStatus
  );

  const { publisher, streamList, onChangeCameraStatus, onChangeMicStatus } =
    useOpenVidu(publisherId);

  useWebSocket({
    onConnect(frame, client) {
      client.subscribe('/sub/animon', function (response) {
        const message = JSON.parse(response.body);
        setPublisherId(message.userName);
        setPublisherVideoStatus(message.status);
      });
    },
  });

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
                  name={publisherId}
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
