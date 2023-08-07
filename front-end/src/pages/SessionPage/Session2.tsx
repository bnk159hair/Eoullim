import React, { useEffect, useRef, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const MyComponent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

  const stompClientRef = useRef<Client>();

  useEffect(() => {
    stompClientRef.current = new Client({
      brokerURL: 'ws://localhost:8081/ws', // WebSocket 서버 URL로 바꾸세요.
      debug: (str) => console.log(str),
    });

    stompClientRef.current.onConnect = () => {
      setConnected(true);
      console.log('WebSocket 연결됨');
      if (connected && stompClientRef.current) {
        stompClientRef.current.subscribe('/sub/animon', (message) => {
          console.log('메시지 수신:', message.body);
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      }
    };

    stompClientRef.current.onDisconnect = () => {
      console.log('WebSocket 연결 닫힘');
      setConnected(false);
    };

    stompClientRef.current.activate();

    return () => {
      if (connected && stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (connected && stompClientRef.current) {
      stompClientRef.current.publish({
        destination: '/pub/animon',
        body: messageInput,
      });
      console.log('메시지 전송:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleSendMessage} disabled={!connected}>
          Send Message
        </button>
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          disabled={!connected}
          placeholder="메시지를 입력하세요."
        />
      </div>
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyComponent;
