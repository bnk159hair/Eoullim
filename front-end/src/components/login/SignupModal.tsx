import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../apis/urls";
import {
  ModalContent,
  ModalOverlay,
  ModalFormContainer,
  IdContainer,
} from "./SignupModalStyles";
import { TextField } from "@mui/material";

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    if (!isIdUnique) {
      alert("아이디 중복 확인을 해주세요.");
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
      const signUpData = { userName, password, name, phoneNumber };
      const response = await axios.post(
        `${API_BASE_URL}/users/join`,
        signUpData
      );
      onClose();
      console.log("회원가입 성공:", response);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleIdCheck = async (event: any) => {
    event.preventDefault();
    if (!userName) {
      alert("아이디를 입력해주세요!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/users/id-check`, {
        userName: userName,
      });
      setIsIdUnique(response.data.resultCode);
      console.log("아이디 중복 확인 결과:", response);
      alert(
        response.data.resultCode
          ? "사용 가능한 아이디입니다."
          : "이미 사용 중인 아이디입니다."
      );
    } catch (error) {
      console.error("아이디 중복 확인 에러:", error);
      alert("이미 사용 중인 아이디입니다.");
    }
  };

  const handlePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newValue = event.target.value;
    setPasswordConfirmation(newValue);
    setIsPasswordMatch(password === newValue);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>
          회원가입<button onClick={onClose}>X</button>
        </h2>
        <ModalFormContainer>
          <IdContainer>
            <TextField
              label='아이디'
              variant='outlined'
              margin='dense'
              value={userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(event.target.value)
              }
              error={!isIdUnique}
              helperText={
                isIdUnique
                  ? "사용 가능한 아이디입니다."
                  : "이미 사용 중인 아이디입니다."
              }
            />
            <button onClick={handleIdCheck}>중복확인</button>
          </IdContainer>
          <TextField
            label='비밀번호'
            variant='outlined'
            margin='dense'
            type='password'
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <TextField
            label='비밀번호 확인'
            variant='outlined'
            margin='dense'
            type='password'
            value={passwordConfirmation}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePasswordConfirmation(event)
            }
            error={!isPasswordMatch}
            helperText={!isPasswordMatch && "비밀번호가 일치하지 않습니다."}
          />
          <TextField
            label='이름'
            variant='outlined'
            margin='dense'
            value={name}
            placeholder='홍길동'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <TextField
            label='전화번호'
            variant='outlined'
            margin='dense'
            value={phoneNumber}
            placeholder='01012345678'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(event.target.value)
            }
            helperText="'-'없이 입력해주세요."
          />
          <button onClick={handleSignUp}>회원가입</button>
        </ModalFormContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SignupModal;
