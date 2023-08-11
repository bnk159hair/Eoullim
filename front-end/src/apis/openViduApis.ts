import axios from 'axios';
import { API_BASE_URL } from './urls';
import { Session } from 'openvidu-browser';

interface User {
  childId: String;
  name: String;
  gender: String;
  school: String;
  grade: Number;
}

export const getUserInfo = async (userId: String, userToken: String) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/children/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log('유저 정보 가져오기 성공!');
    console.log(response);
    return response.data.result;
  } catch (error) {
    console.log('유저 정보 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const getToken = async (userInfo: User, userToken: String) => {
  console.log('토큰 가져오기');
  console.log(userInfo);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/random/start`,
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('토큰 가져오기 성공!');
    console.log(response);
    return response.data.token;
  } catch (error) {
    console.log('토큰 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const getFriendSessionToken = async (
  childId: any,
  userToken: String,
  sessionId: String
) => {
  console.log('초대 토큰 가져오기');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/friend/start`,
      {
        childId,
        sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('초대 토큰 가져오기 성공!');
    console.log(response);
    return response.data.token;
  } catch (error) {
    console.log('초대 토큰 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const destroySession = async (session: Session, userToken: any) => {
  console.log('세션 파괴!!!!!!');
  console.log(session.sessionId);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/random/stop`,
      {
        sessionId: session.sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
