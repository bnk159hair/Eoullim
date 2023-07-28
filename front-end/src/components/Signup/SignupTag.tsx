import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { signupState, UserData } from '../../atoms/signupAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SignupProps {
  onSignup: (userData: UserData) => void;
}

const SignupTag: React.FC<SignupProps> = ({ onSignup }) => {
  const [userData, setUserData] = useRecoilState<UserData>(signupState);
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleIdCheck = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/users/id-check?username=${userData.username}`);
      if (response.data.exists) {
        setUsernameError('이미 사용 중인 아이디입니다.');
      } else {
        setUsernameError('');
      }
    } catch (error) {
      console.error('아이디 중복 체크 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('/users/join', userData);
      console.log('회원가입 성공:', response.data);
      onSignup(userData);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    if (name === 'confirmPassword') {
      if (value !== userData.password) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  const { guardianName, phoneNumber, username, password} = userData;

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleIdCheck} disabled={isLoading}>
          중복 체크
        </button>
        {usernameError && <p>{usernameError}</p>}
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
          onChange={handleInput}
          required
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <div>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="guardianName" // 이름 입력란의 name 속성을 "guardianName"으로 수정
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
      <button type="submit" disabled={isLoading}>
        회원가입
      </button>
    </form>
  );
};

export default SignupTag;
