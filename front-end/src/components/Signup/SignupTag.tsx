import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  onSignup: (userData: UserData) => void;
}

interface UserData {
  guardianName: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignupTag: React.FC<SignupProps> = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/login');
  };

  const [userData, setUserData] = useState<UserData>({
    guardianName: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignup(userData);
  };

  const { guardianName, phoneNumber, username, password, confirmPassword } = userData;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="guardianName">보호자 이름:</label>
        <input
          type="text"
          id="guardianName"
          name="guardianName"
          value={guardianName}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">전화번호:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInput}
          required
        />
      </div>
      {password !== confirmPassword && confirmPassword !== '' && (
        <p className="error">비밀번호가 일치하지 않습니다.</p>
      )}
      <button type="submit" onClick={handleSignUpClick}>회원가입</button>
    </form>
  );
}

export default SignupTag;
