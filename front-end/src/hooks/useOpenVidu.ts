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
      session.disconnect();
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
    const mySession = OV.initSession();

    mySession.on('streamCreated', (event) => {
      console.log('스트림 생성');
      const subscriber = mySession.subscribe(event.stream, '');
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => {
        return [
          ...prev.filter((sub) => sub.userId !== +data.userId),
          {
            streamManager: subscriber,
            userId: +data.userId,
          },
        ];
      });
    });

    mySession.on('streamDestroyed', () => leaveSession());
    mySession.on('exception', (exception) => console.warn(exception));

    getToken().then((token) => {
      console.log('토큰은 일단 가져왔고!! 다음은 세션에 연결하기!');
      mySession
        .connect(token, JSON.stringify({ userId }))
        .then(async () => {
          console.log('나를 publisher라고 하자!');
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );

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
          console.log('publisher의 옵션을 설정했고 publish했다!');
          setPublisher(publisher);
          mySession.publish(publisher);
        })
        .catch((error) => {
          console.log('토큰 가져오는 걸 실패했다!!');
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
    console.log(
      '토큰으로 세션에 연결하고, publisher옵션까지 모두 설정 완료했다!!'
    );
    setSession(mySession);
    return () => {
      console.log('useEffect가 return했다!!');
      leaveSession();
    };
  }, [leaveSession, userId]);

  useEffect(() => {
    console.log('탭 종료!!');
    window.addEventListener('beforeunload', () => leaveSession());
    return () => {
      window.removeEventListener('beforeunload', () => leaveSession());
    };
  }, [leaveSession]);

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId }, ...subscribers],
    [publisher, subscribers, userId]
  );

  return {
    publisher,
    streamList,
  };
};
