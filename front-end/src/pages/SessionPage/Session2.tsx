import React, { useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';

const MyComponent: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [animonInput, setAnimonInput] = useState('');
  const [guideInput, setGuideInput] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [receivedAnimon, setReceivedAnimon] = useState<string | null>(null);
  const [receivedGuide, setReceivedGuide] = useState<string | null>(null);
  const [playNextGuide, setPlayNextGuide] = useState<boolean>(false);

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

      client.subscribe('/sub/animon', (message) => {
        console.log('메시지 수신:', message.body);
        setMessages((prevMessages) => [...prevMessages, message]);
        setReceivedAnimon(JSON.parse(message.body).status ? 'ON' : 'OFF');
      });

      client.subscribe('/sub/guide', (message) => {
        console.log('가이드 메시지 수신:', message.body);
        setReceivedGuide(JSON.parse(message.body) ? '동의' : '미동의');
      });
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

  const handleSendAnimonMessage = () => {
    if (stompClient && connected) {
      const animonData = {
        userName: '사용자 이름',
        status: true,
      };

      stompClient.publish({
        destination: '/pub/animon',
        body: JSON.stringify(animonData),
      });
      console.log('메시지 전송:', animonData);
    } else {
      console.log('STOMP 연결이 아직 수립되지 않았습니다.');
    }
  };

  const handleSendGuideMessage = () => {
    if (stompClient && connected) {
      const guideAgreement = true;

      stompClient.publish({
        destination: '/pub/guide',
        body: JSON.stringify(guideAgreement),
      });
      console.log('가이드 메시지 전송:', guideAgreement);
    } else {
      console.log('STOMP 연결이 아직 수립되지 않았습니다.');
    }
  };

  const handlePlayNextGuide = () => {
    // 다음 가이드 재생 기능 추가
    // 이 함수가 호출되면 서버로 요청을 보내고 음성을 재생하도록 구현해야 합니다.
    // 이 예시에서는 메시지를 출력하도록 했습니다.
    console.log('다음 음성을 재생합니다.');
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            value={animonInput}
            onChange={(e) => setAnimonInput(e.target.value)}
            disabled={!connected}
            placeholder="Animon 입력"
          />
          <button onClick={handleSendAnimonMessage} disabled={!connected}>
            Send Animon Message
          </button>
          <span>받은 값: {receivedAnimon}</span>
        </div>
        <div>
          <input
            type="text"
            value={guideInput}
            onChange={(e) => setGuideInput(e.target.value)}
            disabled={!connected}
            placeholder="Guide 입력"
          />
          <button onClick={handleSendGuideMessage} disabled={!connected}>
            Send Guide Agreement
          </button>
          <span>받은 값: {receivedGuide}</span>
        </div>
      </div>
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.body}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={guideInput}
          onChange={(e) => setGuideInput(e.target.value)}
          disabled={!connected}
          placeholder="Guide 입력"
        />
        <button onClick={handleSendGuideMessage} disabled={!connected}>
          Send Guide Agreement
        </button>
      </div>
      <div>
        {/* 다음 가이드 재생 버튼 추가 */}
        <button onClick={handlePlayNextGuide} disabled={!playNextGuide}>
          다음 음성 재생
        </button>
      </div>
      <div>
        {/* 둘 다 동의한 경우 메시지를 표시 */}
        {playNextGuide && <p>다음 음성을 재생합니다.</p>}
      </div>
    </div>
  );
};

export default MyComponent;
