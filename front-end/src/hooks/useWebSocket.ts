/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Client, Frame, StompConfig } from '@stomp/stompjs';
import { WS_BASE_URL } from '../apis/url';
import { WebSocketApis } from '../apis/webSocketApis';

interface Param {
  onConnect: (frame: Frame, client: Client) => void;
  reconnectDelay?: number;
}

export const useWebSocket = (param: Param) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log('WebSocket 연결됨');
      setConnected(true);
      setStompClient(client);
    };

    client.onDisconnect = () => {
      console.log('WebSocket 연결 닫힘');
      setConnected(false);
      setStompClient(null);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return { connected, stompClient };
};
