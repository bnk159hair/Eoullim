import { OpenVidu } from 'openvidu-browser';
import { getToken, destroySession } from '../apis/openViduApis';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useOpenVidu = (userId: any) => {
  const [session, setSession] = useState<any>(null);
  const [publisher, setPublisher] = useState<any>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  console.log('session, publisher, subscribers 생성');

  const leaveSession = useCallback(() => {
    console.log('나가기 실행');
    if (session) {
      console.log('나랑 세션이랑 연결 끊기');
      session.disconnect();
      console.log(session);
      console.log('서버에 세션 끊어달라고 보내기');
      destroySession(session);
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  useEffect(() => {
    console.log('새로운 OV 객체 생성');
    const OV = new OpenVidu();
    //   OV.enableProdMode(); // 배포 시 사용 production 모드로 전환
    console.log('세션 시작');
    let mySession = OV.initSession();

    mySession.on('streamCreated', (event) => {
      console.log('스트림 생성');
      const subscriber = mySession.subscribe(event.stream, '');
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => {
        return [
          ...prev.filter((sub) => sub.userId !== data.userId),
          {
            streamManager: subscriber,
            userId: data.userId,
          },
        ];
      });
    });

    mySession.on('streamDestroyed', () => leaveSession());
    mySession.on('exception', (exception) => console.warn(exception));

    getToken({
      childId: 103,
      name: '홍길동',
      gender: 'M',
      school: '곡란초',
      grade: 3,
    }).then((token: any) => {
      console.log('가져온 토큰 :', token);
      console.log('가져온 토큰으로 세션에 연결');
      mySession
        .connect(token, { clientData: userId })
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );

          console.log('나를 publisher라고 하자!');
          const publisher = OV.initPublisher('', {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });
          console.log('publisher의 옵션을 설정했고 세션 연결을 성공했다!');
          setPublisher(publisher);
          mySession.publish(publisher);
        })
        .catch((error) => {
          console.log('세션 연결을 실패했다!');
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
    setSession(mySession);

    return () => {
      console.log('useEffect가 return했다!!');
      if (mySession) {
        console.log('나랑 세션이랑 연결 끊기');
        mySession.disconnect();
        console.log('서버에 세션 끊어달라고 보내기');
        console.log(mySession);
        destroySession(mySession);
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [userId]);

  useEffect(() => {
    console.log('탭 종료!!');
    const beforeUnloadHandler = () => leaveSession();

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [leaveSession]);

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId }, ...subscribers],
    [publisher, subscribers, userId]
  );
  console.log(streamList);
  return {
    publisher,
    streamList,
  };
};
