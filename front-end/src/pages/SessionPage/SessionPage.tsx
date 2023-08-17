import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { StreamCanvas } from '../../components/stream/StreamCanvas';
import {
  Buttons,
  Character,
  Container,
  MyVideo,
  NavContainer,
  SessionPageContainer,
  Click,
  CharacterContainer,
} from './SessionPageStyles';
import { Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Profile, Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import {
  PublisherId,
  SubscriberId,
  PublisherVideoStatus,
  SubscriberVideoStatus,
  PublisherAnimonURL,
  SubscriberAnimonURL,
  PublisherGuideStatus,
  SubscriberGuideStatus,
  IsAnimonLoaded,
  guideSeq,
  GuideScript,
  TimeStamp,
} from '../../atoms/Session';
import { Client } from '@stomp/stompjs';
import { WS_BASE_URL } from '../../apis/urls';
import { WebSocketApis } from '../../apis/webSocketApis';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import EndModal from '../../components/stream/EndModal';
import { destroySession } from '../../apis/openViduApis';

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

const SessionPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(true);
  const [friends, setFriends] = useState<FriendsProfile[]>([]);
  const [isFriend, setFriend] = useState(false);
  const [publisherId, setPublisherId] = useRecoilState(PublisherId);
  const [subscriberId, setSubscriberId] = useRecoilState(SubscriberId);
  const [publisherVideoStatus, setPublisherVideoStatus] =
    useRecoilState(PublisherVideoStatus);
  const [subscriberVideoStatus, setSubscriberVideoStatus] = useRecoilState(
    SubscriberVideoStatus
  );
  const [publisherAnimonURL, setPublisherAnimonURL] =
    useRecoilState(PublisherAnimonURL);
  const [subscriberAnimonURL, setSubscriberAnimonURL] =
    useRecoilState(SubscriberAnimonURL);
  const [publisherGuideStatus, setPublisherGuideStatus] =
    useRecoilState(PublisherGuideStatus);
  const [subscriberGuideStatus, setSubscriberGuideStatus] = useRecoilState(
    SubscriberGuideStatus
  );

  const [clickEnabled, setClickEnabled] = useState(false);
  const profileId = useRecoilValue(Profilekey);
  const userToken = useRecoilValue(tokenState);
  const profile = useRecoilValue(Profile);
  const [subscriberName, setSubscriberName] = useState('');
  const isAnimonLoaded = useRecoilValue(IsAnimonLoaded);
  const step = useRecoilValue(guideSeq);
  const [guideScript, setGuideScript] = useRecoilState(GuideScript);
  const [index, setIndex] = useState(-1);
  const guideSequence = [...step, 13];
  const guidance = new Audio(`/1.mp3`);
  const [isPlaying, setIsPlaying] = useState(false);

  const [startTime, setStartTime] = useState(0);
  const [timeStamp, setTimeStamp] = useRecoilState(TimeStamp);

  const { publisher, streamList, session, isOpen, onChangeMicStatus } =
    useOpenVidu(profileId);
  console.log(session);
  const [micStatus, setMicStatus] = useState(true);
  useEffect(() => {
    onChangeMicStatus(micStatus);
  }, [micStatus]);

  const sessionOver = () => {
    setOpen(isTrue);
  };

  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    setPublisherVideoStatus(isFalse);
    setSubscriberVideoStatus(isFalse);
    setPublisherGuideStatus(isFalse);
    setSubscriberGuideStatus(isFalse);
    setGuideScript('');
    setTimeStamp('');
    setPublisherId(profileId);
    setPublisherAnimonURL(profile.animon.name + 'mask.png');
    getFriends();
  }, []);

  useEffect(() => {
    for (const user of streamList) {
      console.log('before', Number(user.userId), Number(publisherId));
      if (Number(user.userId) !== profileId) {
        console.log(user);
        console.log(user.userId, publisherId);
        setSubscriberId(user.userId);
        console.log(subscriberId);
      }
    }
    console.log(publisherId, subscriberId);

    if (!open && streamList[0]?.userId && streamList[1]?.userId && first) {
      setFirst(isFalse);
      setStartTime(Date.now());
      setTimeout(() => {
        guidance.play();
        setIsPlaying(true);
      }, 5000);
      guidance.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, [streamList]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    for (const user of streamList) {
      if (Number(user.userId) !== profileId) {
        setSubscriberId(Number(user.userId));
        friends.forEach((user: any) => {
          console.log(user.id, subscriberId);
          console.log(Number(user.id) === Number(subscriberId));
          if (String(user.id) === String(subscriberId)) {
            console.log('친구입니다.');
            setFriend(isTrue);
          }
        });
      }
    }
    console.log(publisherId, subscriberId);
  }, [streamList]);

  useEffect(() => {
    if (subscriberId) {
      getAnimon();
    }
  }, [subscriberId]);

  useEffect(() => {
    if (publisherGuideStatus && subscriberGuideStatus) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      const guidance = new Audio(`/${guideSequence[nextIndex]}.mp3`);
      if (nextIndex <= 4) {
        const nextGuide = guideScript + guideSequence[nextIndex] + ' ';
        setGuideScript(nextGuide);
        const nextTime = timeStamp + String(Date.now() - startTime) + ' ';
        setTimeStamp(nextTime);
        guidance.play();
      }
      setIsPlaying(true);
      setPublisherGuideStatus(isFalse);
      setSubscriberGuideStatus(isFalse);
      guidance.addEventListener('ended', () => {
        setIsPlaying(false);
        if (nextIndex === 4) {
          console.log(guideScript, timeStamp);
          sessionOver();
        }
      });
      setTimeout(() => {
        setClickEnabled(true);
      }, 30000);
    }
  }, [publisherGuideStatus, subscriberGuideStatus]);

  useEffect(() => {
    if (session) {
      const client = new Client({
        connectHeaders: WebSocketApis.getInstance().header,
        brokerURL: WS_BASE_URL,
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
      });

      client.onConnect = () => {
        console.log('WebSocket 연결됨');
        setConnected(true);
        setStompClient(client);

        client.subscribe(`/topic/${session.sessionId}/animon`, (response) => {
          console.log('메시지 수신:', response.body);
          const message = JSON.parse(response.body);
          if (message.childId !== String(publisherId)) {
            console.log(message.childId, message.isAnimonOn);
            console.log('상대방이 화면을 껐습니다.');
            // setSubscriberId(message.childId);
            setSubscriberVideoStatus(message.isAnimonOn);
          }
        });
        client.subscribe(`/topic/${session.sessionId}/guide`, (response) => {
          const message = JSON.parse(response.body);
          console.log(message);
          if (message.childId !== String(publisherId)) {
            // setSubscriberId(message.childId);
            setSubscriberGuideStatus(message.isNextGuideOn);
          }
        });
        client.subscribe(
          `/topic/${session.sessionId}/leave-session`,
          (response) => {
            const message = JSON.parse(response.body);
            console.log(message);
            if (message.childId !== String(publisherId)) {
              setOpen(isTrue);
            }
          }
        );
      };

      client.onDisconnect = () => {
        console.log('WebSocket 연결 닫힘');
        setConnected(isFalse);
        setStompClient(null);
      };

      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [streamList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickEnabled(true);
    }, 30000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getFriends = () => {
    console.log(profileId);
    axios
      .get(`${API_BASE_URL}/friendship/${profileId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
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

  const getAnimon = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/children/participant/${subscriberId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log('유저 정보 가져오기 성공!');
      console.log(response);
      setSubscriberAnimonURL(response.data.result.animon.name + 'mask.png');
      setSubscriberName(response.data.result.name);
      return response.data.result;
    } catch (error) {
      console.log('유저 정보 가져오기 실패ㅠ');
      console.log(error);
      throw error;
    }
  };

  const leaveSession = () => {
    setOpen(false);
    if (connected && stompClient) {
      const jsonMessage = {
        childId: String(publisherId),
        isLeft: true,
      };
      const message = JSON.stringify(jsonMessage);
      stompClient.publish({
        destination: `/app/${session.sessionId}/leave-session`,
        body: message,
      });
      console.log('메시지 전송:', message);
    }
    destroySession(session, guideScript, timeStamp, userToken);
    session.disconnect();
    navigate('/');
  };

  const addFriend = () => {
    console.log(publisherId, subscriberId);
    console.log(userToken);
    axios
      .post(
        `${API_BASE_URL}/friendship`,
        { myId: Number(publisherId), friendId: Number(subscriberId) },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        leaveSession();
      })
      .catch((error) => {
        if (error.response.data.resultCode === 'INVALID_DATA') {
          leaveSession();
        } else console.log(error);
      });
  };

  const changeVideoStatus = () => {
    console.log(stompClient);
    if (connected && stompClient) {
      const isAnimonOn = !publisherVideoStatus;
      setPublisherVideoStatus(isAnimonOn);
      const jsonMessage = {
        childId: String(publisherId),
        isAnimonOn: isAnimonOn,
      };
      const message = JSON.stringify(jsonMessage);
      stompClient.publish({
        destination: `/app/${session.sessionId}/animon`,
        body: message,
      });
      console.log('메시지 전송:', message);
    }
  };

  const changeAudioStatus = () => {
    setMicStatus((prev) => !prev);
  };

  const nextGuidance = () => {
    if (clickEnabled) {
      setClickEnabled(false); // 클릭 비활성화
      if (connected && stompClient) {
        const isNextGuideOn = !publisherGuideStatus;
        setPublisherGuideStatus(isNextGuideOn);
        const jsonMessage = {
          childId: String(publisherId),
          isNextGuideOn: isNextGuideOn,
        };
        const message = JSON.stringify(jsonMessage);
        stompClient.publish({
          destination: `/app/${session.sessionId}/guide`,
          body: message,
        });
        console.log('가이드 전송:', message);
      }
    }
  };

  const isTrue = () => {
    return true;
  };

  const isFalse = () => {
    return false;
  };

  return (
    <>
      {!open ? (
        <SessionPageContainer>
          <Container>
            <MyVideo>
              {streamList.length > 1 && streamList[1].streamManager ? (
                <>
                  <StreamCanvas
                    streamManager={streamList[1].streamManager}
                    name={subscriberName}
                    avatarPath={subscriberAnimonURL}
                    videoState={subscriberVideoStatus}
                  />
                  <Loading isAnimonLoaded={isAnimonLoaded} />
                </>
              ) : (
                <Loading isAnimonLoaded={false} />
              )}
            </MyVideo>
            <CharacterContainer>
              <Character onClick={nextGuidance} isPlaying={isPlaying}>
                {clickEnabled ? <Click /> : <></>}
              </Character>
            </CharacterContainer>
            <MyVideo>
              {streamList.length > 1 && streamList[0].streamManager ? (
                <>
                  <StreamCanvas
                    streamManager={streamList[0].streamManager}
                    name={profile.name}
                    avatarPath={`${publisherAnimonURL}`}
                    videoState={publisherVideoStatus}
                  />
                  <Loading isAnimonLoaded={isAnimonLoaded} />
                </>
              ) : (
                <Loading isAnimonLoaded={false} />
              )}
            </MyVideo>
          </Container>
          <NavContainer>
            <Buttons>
              <Button
                variant="contained"
                onClick={changeVideoStatus}
                sx={{ fontSize: '28px' }}
              >
                {publisherVideoStatus
                  ? profile.gender === 'W'
                    ? '👩'
                    : '🧑'
                  : '🙈'}
              </Button>
              <Button variant="contained" onClick={changeAudioStatus}>
                {micStatus ? (
                  <MicIcon fontSize="large"></MicIcon>
                ) : (
                  <MicOffIcon fontSize="large"></MicOffIcon>
                )}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={sessionOver}
                sx={{ fontSize: '30px' }}
              >
                나가기
              </Button>
            </Buttons>
          </NavContainer>
        </SessionPageContainer>
      ) : streamList.length !== 2 ? (
        leaveSession()
      ) : !isFriend ? (
        <EndModal
          onClose={leaveSession}
          message="친구 조아?"
          isFriend={isFriend}
          addFriend={addFriend}
        />
      ) : (
        <EndModal
          onClose={leaveSession}
          message="통화가 끝났습니다."
          isFriend={isFriend}
          addFriend={addFriend}
        />
      )}
    </>
  );
};

export default SessionPage;
