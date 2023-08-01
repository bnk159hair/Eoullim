import axios from 'axios';

const SERVER_URL = 'https://i9c207.p.ssafy.io/';

export const getToken: () => Promise<any> = async () => {
  console.log('토큰 가져오기');
  return await axios
    .post(
      `${SERVER_URL}api/sessions/match`,
      {
        childId: 11,
        name: '홍길동',
        gender: 'M',
        school: '곡란초',
        grade: 3,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((response) => {
      console.log('토큰 가져오기 성공!');
      return response.data.getToken;
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
  await axios.post(`${SERVER_URL}/api/sessions/matchstop`, {
    sessionId: session.sessionId,
  });
};

// const getToken = async (mySessionId: any) => {
//   return createSession(mySessionId).then((sessionId) => createToken(sessionId));
// };

// const createSession = async (sessionId: any) => {
//   const response = await axios.post(
//     `${SERVER_URL}api/sessions`,
//     { customSessionId: sessionId },
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );
//   return response.data;
// };

// const createToken = async (sessionId: any) => {
//   const response = await axios.post(
//     `${SERVER_URL}api/sessions/${sessionId}/connections`,
//     {},
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );
//   return response.data;
// };
