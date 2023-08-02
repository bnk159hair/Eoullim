import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import OpenViduVideoComponent from './../../components/stream/OvVideo';

const Session = () => {
  const navigate = useNavigate();

  console.log('오픈비두 시작');
  const userId = 'user01';
  const { publisher, streamList } = useOpenVidu(userId);

  const leaveSession = async () => {
    navigate('/');
  };

  return (
    <div>
      <h1>FriendVideo</h1>
      {publisher === null ? <Loading /> : null}
      {publisher ? <OpenViduVideoComponent streamManager={publisher} /> : null}
      <h1>MyVideo</h1>
      <h1>Character</h1>
      <button onClick={leaveSession}>나가기 컴포넌트</button>
    </div>
  );
};

export default Session;
