import React, { useEffect, useState } from 'react';
import {
  MainPageContainer,
  ProfileImg,
  MarginContainer,
  MainCharacter,
  BackIcon,
  ChaterLocation,
  MyFriend,
  NewFriend,
  NewFirendsignpost,
  MyFirendsignpost,
  HoberLeft,
  HoberRight,
} from './MainPageStyles';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Profile, Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import AnimonModal from '../../components/main/AnimonModal';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);

  const [profile, setProfile] = useRecoilState(Profile);

  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const source = new EventSource(
      `https://i9c207.p.ssafy.io/api/v1/alarms/subscribe/${profileId}`
    );
    setEventSource(source);
    console.log(source, eventSource);
    return () => {
      if (source) {
        source.close();
        setEventSource(null);
        console.log('이벤트 종료');
      }
    };
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getprofilelist();
    }
  }, [profileId, token, navigate]);

  useEffect(() => {
    if (eventSource) {
      const eventListener = (event: any) => {
        console.log('이벤트가 실행중인가?');
        console.log(event);
      };
      eventSource.addEventListener('sse', eventListener);

      return () => {
        eventSource.removeEventListener('sse', eventListener);
      };
    }
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
  

  const getprofilelist = () => {
    axios
      .get(`${API_BASE_URL}/children/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setProfile(response.data.result);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.log('데이터 불러오기 오류', error);
        }
      });
  };

  const profileLogout = () => {
    axios
      .post(
        `${API_BASE_URL}/children/logout/${profileId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        console.log('프로필로그아웃');
      })
      .catch((error) => {
        console.log('프로필 로그아웃 오류', error);
      });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const IMGURL = `/${profile.animon.name}.png`;

  const [audioObj, setAudioObj] = useState(new Audio('/mainguide.mp3'));

  const playAudio = () => {
    audioObj.currentTime = 0;
    audioObj.play();
  };

  return (
    <MainPageContainer>
      <MarginContainer>
        <BackIcon onClick={getBack} />
        <ProfileImg
          style={{ backgroundImage: `url(${IMGURL})` }}
          onClick={openModal}
        />
      </MarginContainer>
      <ChaterLocation>
        {isModalOpen && (
          <AnimonModal onClose={closeModal} profile={getprofilelist} />
        )}
        <HoberLeft onClick={getNewFriend}>
          <NewFriend />
          <NewFirendsignpost />
        </HoberLeft>
        <MainCharacter
          style={{ backgroundImage: `url(${IMGURL})` }}
          onClick={playAudio}
        />
        <HoberRight onClick={handleFriendsClick}>
          <MyFirendsignpost />
          <MyFriend />
        </HoberRight>
      </ChaterLocation>
    </MainPageContainer>
  );
};

export default MainPage;
