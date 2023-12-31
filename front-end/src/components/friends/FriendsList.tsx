import { useState, useEffect } from 'react';
import FriendsListItem from './FriendsListItem';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue } from 'recoil';
import { EmptyFriend,BeforeButton,AfterButton,FriendsListContent } from './FriendsListStyles';
import { useNavigate } from 'react-router-dom';

interface FriendsProfile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
  animon: { id: number; imagePath: string; name: string };
}

const FriendsList = () => {
  const navigate = useNavigate();
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);
  const [friends, setFriends] = useState<FriendsProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const friendsPerPage = 3; // 페이지당 보여줄 친구 수 설정

  const getFriends = () => {
    axios
      .get(`${API_BASE_URL}/friendship/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.result;
        setFriends(data);
        console.log(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.log('친구목록불러오기오류', error);
        }
      });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getFriends();
    }
  }, [profileId, token]);

  const indexOfLastFriend = currentPage * friendsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
  const currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {friends.length > friendsPerPage && (
        <div style={{width: '80px'}}>{currentPage > 1 && 
        <BeforeButton onClick={prevPage}/>
        }</div>
      )}
      <FriendsListContent>
      {/* <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '1200px' }}
      > */}
        {currentFriends.length > 0 ? (
          currentFriends.map((friend) => (
            <FriendsListItem
              key={friend.id}
              friendId={friend.id}
              friendName={friend.name}
              animon={friend.animon.name}
              status={friend.status}
            />
          ))
        ) : (
          <EmptyFriend />
        )}
      {/* </div> */}
      </FriendsListContent>
      {friends.length > friendsPerPage && (
        <div style={{width: '80px'}}>
          {currentPage < Math.ceil(friends.length / friendsPerPage) && (
            <AfterButton onClick={nextPage}/>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
