import React,{ useState,useEffect} from 'react';
import FriendsListItem from './FriendsListItem';
import axios from 'axios';
import { BASEURL } from '../../apis/urls';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';
import { useRecoilValue } from 'recoil';

interface FriendsProfile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
  animon: { id: 0; imagePath: ''; name: '' };
}

const FriendsList = () => {
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);
  const [friends, setFriends] = useState<FriendsProfile[]>([]);

  const getFriends = () => {
    axios
      .get(`${BASEURL}/friendship/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        const data = response.data.result
        setFriends(data)
        console.log(data)
      })
      .catch((error)=>{
        console.log('친구목록불러오기오류',error)
      })
  }
  useEffect(()=>{
    getFriends();
  }, [profileId, token])

  return (
    <div>
      {friends.map((friend)=>(
        <FriendsListItem 
          key={friend.id}
          ChildId={friend.id}
          name={friend.name}
          imgurl={friend.animon.imagePath} />
      ))}
    </div>
  );
};

export default FriendsList;
