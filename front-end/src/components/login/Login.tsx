import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "../../atoms/Auth";
import {
  FormContainer,
  LoginButton,
  SignupContainer,
  SignupAnchor,
} from "./LoginStyles";
import { TextField, InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { BASEURL } from "../../apis/urls";
import SignUpModal from "./SignupModal";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogin = (event: any) => {
    event.preventDefault();
    axios
      .post(`${BASEURL}/users/login`, { userName, password })
      .then((response) => {
        setToken(response.data.result);
        navigate("/profile");
      })
      .catch((error) => {
        alert("아이디와 비밀번호를 확인해주세요.");
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <FormContainer onSubmit={handleLogin}>
        <TextField
          label='아이디'
          variant='filled'
          color='success'
          margin='dense'
          value={userName}
          sx={{
            bgcolor: "white",
            borderRadius: "5px",
            width: "80%",
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label='비밀번호'
          variant='filled'
          color='success'
          margin='dense'
          type='password'
          value={password}
          sx={{
            bgcolor: "white",
            borderRadius: "5px",
            width: "80%",
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
        <LoginButton type='submit'>로그인</LoginButton>
      </FormContainer>
      <SignupContainer>
        <span>아직 회원이 아니신가요?</span>
        <SignupAnchor onClick={handleModalOpen}>회원가입</SignupAnchor>
        {isModalOpen && <SignUpModal onClose={handleModalClose} />}
      </SignupContainer>
    </>
  );
};

export default Login;
