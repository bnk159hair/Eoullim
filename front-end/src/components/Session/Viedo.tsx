import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

const SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://i9c207.p.ssafy.io/';

//   const [publisher, setPublisher] = useState<any>(null);
//   const [subscriber, setSubscriber] = useState<any>(null);

const joinSession = async () => {
  try {
    const OV = new OpenVidu();
    //   OV.enableProdMode(); // 배포 시 사용 production 모드로 전환
    const mySession = OV.initSession();
    console.log(OV);
    console.log(mySession);
    //   console.log(getToken(mySession))
  } catch {}
};

const getToken = async (mySessionId: string) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

const createSession = async (sessionId: string | undefined) => {
  const response = await axios.post(
    `${SERVER_URL}api/sessions`,
    { customSessionId: sessionId },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data; // The sessionId
};

const createToken = async (sessionId: string | undefined) => {
  const response = await axios.post(
    `${SERVER_URL}api/sessions/${sessionId}/connections`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data; // The token
};

export default joinSession;
