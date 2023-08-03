import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import {BASEURL} from '../../apis/api'

const SignUpTag = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [resultCode, setIsresultCode] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!resultCode) {
      alert("아이디 중복 체크를 해주세요.");
      return;
    }

    if (!userName || !password || !name || !phoneNumber) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const signUpData = { userName , password, name, phoneNumber };
      const response = await axios.post(`${BASEURL}/users/join`, signUpData);
      console.log("회원가입 성공:", response);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/id-check`, {
        userName: userName  
      });
      setIsresultCode(response.data.resultCode);
      console.log("아이디 중복 체크 결과:", response);
      alert(response.data.resultCode ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.");
    } catch (error) {
      console.error("아이디 중복 체크 에러:", error);
      alert("이미 사용 중인 아이디입니다.");
    }
  };

  const handlePasswordConfirmation = () => {
    setIsPasswordMatch(password === passwordConfirmation);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleIdCheck}>
          중복체크
        </button>
        {resultCode && (
          <div style={{ color: "green" }}>사용 가능한 아이디입니다.</div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          onBlur={handlePasswordConfirmation}
        />
        {!isPasswordMatch && (
          <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSignUp}>회원가입</button>
      <div>
        <NavLink to="/login">
          <button>이미 계정이 있으신가요? 로그인</button>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpTag;
