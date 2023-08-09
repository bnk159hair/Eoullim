import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/stream/Loading';
import { useOpenVidu } from '../../hooks/useOpenVidu';
import { StreamCanvas } from '../../components/stream/StreamCanvas';
import {
  Buttons,
  Character,
  Container,
  MainWrapper,
  MyVideo,
  SideBar,
  YourVideo,
} from './SessionPageStyles';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Profilekey } from '../../atoms/Profile';
import { tokenState } from '../../atoms/Auth';
import {
  PublisherId,
  SubscriberId,
  PublisherVideoStatus,
  SubscriberVideoStatus,
} from '../../atoms/Session';
import { Client, Message } from '@stomp/stompjs';
import { WS_BASE_URL } from '../../apis/urls';
import { WebSocketApis } from '../../apis/webSocketApis';
import axios from 'axios';
import { API_BASE_URL } from '../../apis/urls';

const SessionPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [publisherId, setPublisherId] = useRecoilState(PublisherId);
  const [subscriberId, setSubscriberId] = useRecoilState(SubscriberId);
  const [publisherVideoStatus, setPublisherVideoStatus] =
    useRecoilState(PublisherVideoStatus);
  const [subscriberVideoStatus, setSubscriberVideoStatus] = useRecoilState(
    SubscriberVideoStatus
  );
  const profileId = useRecoilValue(Profilekey);
  const token = useRecoilValue(tokenState);
  console.log('오픈비두 시작');

  setPublisherId(profileId);

  const { streamList } = useOpenVidu(profileId);
  const sessionOver = () => {
    setOpen(true);
  };

  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    for (const user of streamList) {
      if (user.userId !== publisherId) {
        setSubscriberId(user.userId);
      }
    }
  }, [streamList]);

  useEffect(() => {
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

      client.subscribe('/sub/animon', (response) => {
        console.log('메시지 수신:', response.body);
        const message = JSON.parse(response.body);
        if (message.userName !== String(publisherId)) {
          console.log(message.userName, message.status);
          console.log('상대방이 화면을 껐습니다.');
          setSubscriberId(message.userName);
          setSubscriberVideoStatus(message.status);
        }
      });
    };

    client.onDisconnect = () => {
      console.log('WebSocket 연결 닫힘');
      setConnected(false);
      setStompClient(null);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [publisherId]);

  const leaveSession = () => {
    setOpen(false);
    navigate('/');
  };

  const addFriend = () => {
    console.log(publisherId, subscriberId);
    axios
      .post(
        `${API_BASE_URL}/friendship`,
        { childId: String(publisherId), frinedId: String(subscriberId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeVideoStatus = () => {
    console.log(stompClient);
    if (connected && stompClient) {
      const status = !publisherVideoStatus;
      setPublisherVideoStatus(status);
      const jsonMessage = {
        userName: String(publisherId),
        status: status,
      };
      const message = JSON.stringify(jsonMessage);
      stompClient.publish({
        destination: '/pub/animon',
        body: message,
      });
      console.log('메시지 전송:', message);
    }
  };

  return (
    <>
      {!open ? (
        <Container>
          <MainWrapper>
            <YourVideo>
              {streamList.length > 1 && streamList[1].streamManager ? (
                <StreamCanvas
                  streamManager={streamList[1].streamManager}
                  id={streamList[1].userId}
                  avatarPath="http://localhost:3000/image.png"
                  videoState={subscriberVideoStatus}
                />
              ) : (
                <Loading />
              )}
            </YourVideo>
          </MainWrapper>
          <SideBar>
            <Character>Character</Character>
            <MyVideo>
              {streamList.length > 1 && streamList[0].streamManager ? (
                <StreamCanvas
                  streamManager={streamList[0].streamManager}
                  id={streamList[0].userId}
                  avatarPath="http://localhost:3000/14.png"
                  videoState={publisherVideoStatus}
                />
              ) : (
                <Loading />
              )}
            </MyVideo>
            <Buttons>
              <button onClick={changeVideoStatus}>애니몬</button>
              <button onClick={sessionOver}>나가기</button>
            </Buttons>
          </SideBar>
        </Container>
      ) : streamList.length !== 2 ? (
        navigate('/')
      ) : (
        <Container>
          <Modal open={open} onClose={leaveSession} hideBackdrop={true}>
            <Box
              sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid black',
                boxShadow: 24,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" component="h2">
                친구 조아?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <IconButton onClick={addFriend}>O</IconButton>
                <IconButton onClick={leaveSession}>X</IconButton>
              </Box>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default SessionPage;
