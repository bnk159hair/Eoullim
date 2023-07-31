import axios from 'axios';

const SERVER_URL = 'https://i9c207.p.ssafy.io/';

const getToken = async (mySessionId: any) => {
  return createSession(mySessionId).then((sessionId) => createToken(sessionId));
};

const createSession = async (sessionId: any) => {
  const response = await axios.post(
    `${SERVER_URL}api/sessions`,
    { customSessionId: sessionId },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};

const createToken = async (sessionId: any) => {
  const response = await axios.post(
    `${SERVER_URL}api/sessions/${sessionId}/connections`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};

export default getToken;
