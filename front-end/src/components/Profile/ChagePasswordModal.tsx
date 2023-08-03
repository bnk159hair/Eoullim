import React, { useState } from 'react';
import axios from 'axios';
import { ModalOverlay, ModalContent } from './ChagePasswordModal.styles';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue, useRecoilState } from 'recoil';
import {BASEURL} from '../../apis/api'
import { useNavigate } from 'react-router-dom';

interface ChagePasswordModalProps {
  onClose: () => void;
}

const ChagePasswordModal: React.FC<ChagePasswordModalProps> = ({ onClose }) => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword,setNewPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const token = useRecoilValue(tokenState);
    const [, setToken] = useRecoilState(tokenState);
    const navigate = useNavigate();

    const handlePasswordConfirmation = () => {
        setIsPasswordMatch(newPassword === passwordConfirmation);
      };

      const logoutClick = () =>{
        axios
          .get(`${BASEURL}/users/logout`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response)=>
          {
            setToken('');
            navigate('/login')
  
          })
          .catch((error)=>{
            console.log(token)
            console.log('로그아웃 오류:',error)
            setToken('');
            navigate('/login')
          })
      }

    const handleChagePassword = async () => {
        if (!curPassword) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        if (!isPasswordMatch) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            return;
        }

    try {
      const usersData = { curPassword,newPassword };
      const response = await axios.put(`${BASEURL}/users`, usersData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('비밀번호 변경성공', response);
      // onClose();
      logoutClick()
    } catch (error) {
        console.log(token)
      console.log('비밀번호 변경 실패', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>비밀번호 변경</h2>
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={curPassword}
          onChange={(e) => setCurPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          onBlur={handlePasswordConfirmation}
        />
        {!isPasswordMatch && (
          <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
        )}
        <button onClick={handleChagePassword}>변경</button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChagePasswordModal;
