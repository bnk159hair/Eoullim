import FriendsList from '../../components/friends/FriendsList';
import { useNavigate } from 'react-router-dom';
import { FriendsPageContainer } from './FriendsPageStyles';

const FriendsPage = () => {
  const navigate = useNavigate();

  const handleMainClick = () => {
    navigate('/');
  };

  return (
    <FriendsPageContainer>
      <FriendsList />
      <button onClick={handleMainClick}>뒤로 가기</button>
    </FriendsPageContainer>
  );
};

export default FriendsPage;
