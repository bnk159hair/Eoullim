import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const LoginTag: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the /signup page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">로그인</button>
      <button type="button" onClick={handleSignUpClick}>회원가입</button>
    </form>
  );
};

export default LoginTag;
