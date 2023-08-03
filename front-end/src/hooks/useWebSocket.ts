/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { WS_BASE_URL } from '../apis/url';
import { WebSocketApis } from '../apis/webSocketApis';
import SockJS from 'sockjs-client';

export const useWebSocket = (userId: string, status: boolean) => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new SockJS(WS_BASE_URL); // WebSocket 서버 URL로 바꾸세요.

    socket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    socket.onmessage = (event) => {
      console.log('메시지 수신:', event.data);
      const message = event.data.split();
      return message;
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 닫힘');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = (userName: string, status: boolean) => {
    if (connected) {
      const socket = new SockJS(WS_BASE_URL);
      const messageToSend = JSON.stringify({
        userName: userName,
        status: status,
      });
      if (messageToSend) {
        socket.send(messageToSend);
        console.log('메시지 전송', messageToSend);
      }
      socket.close();
    }
  };

  return connected;
};
