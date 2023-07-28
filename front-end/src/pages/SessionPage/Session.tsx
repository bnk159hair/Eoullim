import { useNavigate } from 'react-router-dom';

const Session = () => {
  const navigate = useNavigate();

  const leaveSession = async () => {
    navigate('/');
  };

  return (
    <div>
      <h1>FriendVideo</h1>
      <h1>MyVideo</h1>
      <h1>Character</h1>
      <button onClick={leaveSession}>나가기 컴포넌트</button>
    </div>
  );
};

export default Session;
