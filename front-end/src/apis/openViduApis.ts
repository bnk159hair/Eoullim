import axios, { formToJSON } from 'axios';
import { API_BASE_URL } from './urls';

export const getToken: (userInfo: object) => Promise<any> = async (
  userInfo
) => {
  console.log('토큰 가져오기');
  console.log(userInfo);
  return await axios
    .post(`${API_BASE_URL}/api/openvidu/matchstart`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('토큰 가져오기 성공!');
      console.log(response);
      return response.data.token;
    })
    .catch((error) => {
      console.log('토큰 가져오기 실패ㅠ');
      console.log(error);
    });
};

export const destroySession: (session: any) => Promise<void> = async (
  session
) => {
  console.log('세션 파괴!!!!!!');
  console.log(session.sessionId);
  await axios
    .post(`${API_BASE_URL}/api/openvidu/matchstop`, {
      sessionId: session.sessionId,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
