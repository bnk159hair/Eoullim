import React, { useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';

const MyComponent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws', // WebSocket 서버 URL로 바꾸세요.
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      console.log('WebSocket 연결됨');
      setConnected(true);
      stompClient.subscribe('/topic/messages', (message) => {
        console.log('메시지 수신:', message.body);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    };

    stompClient.onDisconnect = () => {
      console.log('WebSocket 연결 닫힘');
      setConnected(false);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleSendMessage = () => {
    if (connected) {
      const stompClient = new Client({
        brokerURL: 'ws://your-websocket-server-url', // WebSocket 서버 URL로 바꾸세요.
      });

      stompClient.publish({ destination: '/app/chat', body: messageInput });
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
