import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Session/Loading';
import useOpenVidu from '../../hooks/useOpenVidu';

const Session = () => {
  const [loading, setLoading] = useState(true); // 전역 변수로 두고 두 명 모두 참가하면 false로 변경
  const navigate = useNavigate();

  // const { publisher, streamList, onChangeAnimonStatus, onChangeMicStatus } =
  useOpenVidu('1', '1');

  setTimeout(() => {
    setLoading(false);
  }, 1500);
  const leaveSession = async () => {
    navigate('/');
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      <h1>FriendVideo</h1>
      <h1>MyVideo</h1>
      <h1>Character</h1>
      <button onClick={leaveSession}>나가기 컴포넌트</button>
    </div>
  );
};

export default Session;
