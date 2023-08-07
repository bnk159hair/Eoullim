/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Client, Frame, StompConfig } from '@stomp/stompjs';
import { WS_BASE_URL } from '../apis/url';
import { WebSocketApis } from '../apis/webSocketApis';
import { PublisherId, PublisherVideoStatus } from '../atoms/Session';
import { useRecoilValue } from 'recoil';

interface Param {
  onConnect: (frame: Frame, client: Client) => void;
  reconnectDelay?: number;
}

export const useWebSocket = (param: Param) => {
  const [connected, setConnected] = useState<boolean>(false);
  const stompClientRef = useRef<Client>();
  const publisherId = useRecoilValue(PublisherId);
  const publisherVideoStatus = useRecoilValue(PublisherVideoStatus);

  useEffect(() => {
    const config: StompConfig = {
      connectHeaders: WebSocketApis.getInstance().header,
      brokerURL: WS_BASE_URL,
      reconnectDelay: param.reconnectDelay ? param.reconnectDelay : 5000,
      onConnect: (frame) => {
        console.log('소켓 연결 성공!!', frame);
        setConnected(true);
        param.onConnect(frame, stompClientRef.current!);
      },
      onDisconnect: (frame) => {
        console.log('소켓 연결 끊음!!', frame);
        setConnected(false);
      },
      logRawCommunication: false,
    };
    stompClientRef.current = new Client(config);
    stompClientRef.current.activate();

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, []);

  const changeVideoStatus = () => {
    if (connected && stompClientRef.current) {
      const jsonMessage = {
        userName: publisherId,
        status: publisherVideoStatus,
      };
      const message = JSON.stringify(jsonMessage);
      stompClientRef.current.publish({
        destination: '/pub/animon',
        body: message,
      });
      console.log('메시지 전송:', message);
    }
  };

  return connected;
};
