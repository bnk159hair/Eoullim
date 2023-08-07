import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [greetings, setGreetings] = useState<string[]>([]);
  const [name, setName] = useState('');

  var stompClient: Stomp.Client | null = null;

  const setConnectedStatus = (connected: boolean) => {
    setConnected(connected);
  };

  const connect = () => {
    const socket = new SockJS('http://localhost:8081/ws', null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
    });
    stompClient = Stomp.over(socket);
    console.log(stompClient);
    stompClient.connect({}, (frame) => {
      setConnectedStatus(true);
      console.log('Connected: ' + frame);
    });
    stompClient.subscribe('/topic/greetings', (greeting) => {
      showGreeting(JSON.parse(greeting.body).content);
    });
  };

  const disconnect = () => {
    // if (stompClient !== null) {
    //   stompClient.disconnect();
    // }
    setConnectedStatus(false);
    console.log('Disconnected');
  };

  const sendName = () => {
    if (stompClient !== null) {
      stompClient.send('/app/hello', {}, JSON.stringify({ name: name }));
    }
  };

  const showGreeting = (message: string) => {
    setGreetings((prevGreetings) => [...prevGreetings, message]);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <button onClick={connect} disabled={connected}>
          Connect
        </button>
        <button onClick={disconnect} disabled={!connected}>
          Disconnect
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={sendName} disabled={!connected}>
          Send
        </button>
      </form>
      <div>
        <h3>Greetings:</h3>
        <ul>
          {greetings.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
