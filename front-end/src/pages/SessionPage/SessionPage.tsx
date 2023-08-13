import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/stream/Loading";
import { useOpenVidu } from "../../hooks/useOpenVidu";
import { StreamCanvas } from "../../components/stream/StreamCanvas";
import {
  Buttons,
  Character,
  Container,
  MainWrapper,
  MyVideo,
  NavContainer,
  SessionPageContainer,
  SideBar,
  YourVideo,
  Click,
} from "./SessionPageStyles";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { Profile, Profilekey } from "../../atoms/Profile";
import { tokenState } from "../../atoms/Auth";
import {
  PublisherId,
  SubscriberId,
  PublisherVideoStatus,
  SubscriberVideoStatus,
  PublisherAnimonURL,
  SubscriberAnimonURL,
  PublisherGuideStatus,
  SubscriberGuideStatus,
} from "../../atoms/Session";
import { Client } from "@stomp/stompjs";
import { WS_BASE_URL } from "../../apis/urls";
import { WebSocketApis } from "../../apis/webSocketApis";
import axios from "axios";
import { API_BASE_URL } from "../../apis/urls";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

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

  const profileId = useRecoilValue(Profilekey);
  const userToken = useRecoilValue(tokenState);
  const profile = useRecoilValue(Profile);
  const [subscriberName, setSubscriberName] = useState("");

  const guidance = ["0번 가이드", "1번 가이드", "2번 가이드", "3번 가이드"];
  const [step, setStep] = useState(0);

  console.log("오픈비두 시작");

  setPublisherId(profileId);
  setPublisherAnimonURL(
    "https://i9c207.p.ssafy.io/" + profile.animon.name + "mask"
  );

  const { publisher, streamList, session, isOpen, onChangeMicStatus } =
    useOpenVidu(profileId);
  const [micStatus, setMicStatus] = useState(true);
  useEffect(() => {
    onChangeMicStatus(micStatus);
  }, [micStatus]);

  const sessionOver = () => {
    setOpen(true);
  };

  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    setPublisherVideoStatus(false);
    setSubscriberVideoStatus(false);
    setPublisherGuideStatus(false);
    setSubscriberGuideStatus(false);
    getFriends();
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    for (const user of streamList) {
      if (user.userId !== publisherId) {
        setSubscriberId(user.userId);
      }
      if (subscriberId) {
        getAnimon();
        friends.forEach((user: any) => {
          console.log(user.id, subscriberId);
          if (user.id === Number(subscriberId)) {
            console.log("친구입니다.");
            setFriend(true);
          }
        });
      }
    }
  }, [streamList]);

  useEffect(() => {
    if (publisherGuideStatus && subscriberGuideStatus) {
      setStep(step + 1);
      setPublisherGuideStatus(false);
      setSubscriberGuideStatus(false);
      console.log(step);
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
        console.log("WebSocket 연결됨");
        setConnected(true);
        setStompClient(client);

        client.subscribe(`/topic/${session.sessionId}/animon`, (response) => {
          console.log("메시지 수신:", response.body);
          const message = JSON.parse(response.body);
          if (message.childId !== String(publisherId)) {
            console.log(message.childId, message.isAnimonOn);
            console.log("상대방이 화면을 껐습니다.");
            setSubscriberId(message.childId);
            setSubscriberVideoStatus(message.isAnimonOn);
          }
        });
        client.subscribe(`/topic/${session.sessionId}/guide`, (response) => {
          const message = JSON.parse(response.body);
          console.log(message);
          if (message.childId !== String(publisherId)) {
            setSubscriberId(message.childId);
            setSubscriberGuideStatus(message.isNextGuideOn);
          }
        });
        client.subscribe(
          `/topic/${session.sessionId}/leave-session`,
          (response) => {
            const message = JSON.parse(response.body);
            console.log(message);
            if (message.childId !== String(publisherId)) {
              setOpen(true);
            }
          }
        );
      };

      client.onDisconnect = () => {
        console.log("WebSocket 연결 닫힘");
        setConnected(false);
        setStompClient(null);
      };

      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [streamList]);

  const getFriends = () => {
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
          navigate("/login");
        } else {
          console.log("친구목록불러오기오류", error);
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

      console.log("유저 정보 가져오기 성공!");
      console.log(response);
      setSubscriberAnimonURL(
        "https://i9c207.p.ssafy.io/" + response.data.result.animon.name + "mask"
      );
      setSubscriberName(response.data.result.name);
      return response.data.result;
    } catch (error) {
      console.log("유저 정보 가져오기 실패ㅠ");
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
      console.log("메시지 전송:", message);
    }
    navigate("/");
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
        if (error.response.data.resultCode === "INVALID_DATA") {
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
      console.log("메시지 전송:", message);
    }
  };

  const changeAudioStatus = () => {
    setMicStatus((prev) => !prev);
  };

  const nextGuidance = () => {
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
      console.log("가이드 전송:", message);
    }
  };

  return (
    <>
      {!open ? (
        <SessionPageContainer>
          <Container>
            <MainWrapper>
              <YourVideo>
                {streamList.length > 1 && streamList[1].streamManager ? (
                  <StreamCanvas
                    streamManager={streamList[1].streamManager}
                    name={subscriberName}
                    avatarPath={subscriberAnimonURL}
                    videoState={subscriberVideoStatus}
                  />
                ) : (
                  <Loading />
                )}
              </YourVideo>
            </MainWrapper>
            <SideBar>
              <Character onClick={nextGuidance}>
                {guidance[step]}
                <Click />
              </Character>
              <MyVideo>
                {streamList.length > 1 && streamList[0].streamManager ? (
                  <StreamCanvas
                    streamManager={streamList[0].streamManager}
                    name={profile.name}
                    avatarPath={`${publisherAnimonURL}`}
                    videoState={publisherVideoStatus}
                  />
                ) : (
                  <Loading />
                )}
              </MyVideo>
            </SideBar>
          </Container>
          <NavContainer>
            <Buttons>
              <Button
                variant="contained"
                onClick={changeVideoStatus}
                sx={{ fontSize: "28px" }}
              >
                {publisherVideoStatus
                  ? profile.gender === "W"
                    ? "👩"
                    : "🧑"
                  : "🙈"}
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
                sx={{ fontSize: "30px" }}
              >
                나가기
              </Button>
            </Buttons>
          </NavContainer>
        </SessionPageContainer>
      ) : streamList.length !== 2 ? (
        navigate("/")
      ) : !isFriend ? (
        <Container>
          <Modal open={open} onClose={leaveSession} hideBackdrop={true}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid black",
                boxShadow: 24,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h2">
                친구 조아?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={addFriend}>O</IconButton>
                <IconButton onClick={leaveSession}>X</IconButton>
              </Box>
            </Box>
          </Modal>
        </Container>
      ) : (
        <Container>
          <Modal open={open} onClose={leaveSession} hideBackdrop={true}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid black",
                boxShadow: 24,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h2">
                통화가 끝났습니다.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
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
