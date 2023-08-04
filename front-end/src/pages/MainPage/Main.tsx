import React, { useEffect, useState } from 'react';
import { MainPageContainer } from './Main.styles';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import AnimonModal from '../../components/main/AnimonModal';
import axios from 'axios';
import { BASEURL } from '../../apis/api';

interface Animon {
  id: number;
  imagePath: string;
  name: string;
}

interface ChildProfile {
  animon: Animon;
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
}

const Main: React.FC = () => {
  const navigate = useNavigate();
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);

  const [childProfile, setChildProfile] = useState<ChildProfile>({
    id: 0,
    name: '',
    birth: 0,
    gender: '',
    school: '',
    grade: 0,
    status: '',
    animon: { id: 0, imagePath: '', name: '' },
  });

  const getNewFriend = () => {
    navigate('/session');
  };

  const handleFriendsClick = () => {
    navigate('/friends');
  };
  const getBack = () => {
    profileLogout();
    navigate('/profile');
  };
  useEffect(() => {
    getprofilelist();
  }, [profileId, token]);

  const getprofilelist = () => {
    axios
      .get(`${BASEURL}/children/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setChildProfile(response.data.result);
      })
      .catch((error) => {
        console.log('데이터 불러오기 오류', error);
      });
  };

  const profileLogout = () =>{
    axios
      .post (`${BASEURL}/children/logout/${profileId}` ,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(()=>{
        console.log('프로필로그아웃')
      })
      .catch((error)=>{
        console.log('프로필 로그아웃 오류',error)
      })
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <MainPageContainer>
      <div onClick={openModal}>
        프로필 사진
        {childProfile.name}
      </div>
      <div>{childProfile.animon.imagePath}</div>
      {isModalOpen && <AnimonModal onClose={closeModal} profile={getprofilelist} />}
      
      메인페이지
      <button onClick={getNewFriend}>새친구 만들기</button>
      <button onClick={handleFriendsClick}>내친구 목록</button>
      <div>로그인 한 사람 수 0명</div>
      <button onClick={getBack}>뒤로가기</button>
    </MainPageContainer>
  );
};

export default Main;
