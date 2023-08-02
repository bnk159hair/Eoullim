import React, { useState } from 'react';
import axios from 'axios';
import tw from 'twin.macro';
import styled from 'styled-components';
import { ModalOverlay, ModalContent } from './ModifyModal.styles';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
  const [name, setChildName] = useState('');
  const [birth, setChildBirth] = useState('');
  const [gender, setChildGender] = useState(''); 
  const [school, setChildSchool] = useState('');
  const [grade, setChildGrade] = useState(''); 
  const BASEURL = 'http://localhost:8080/api/v1';
  const token = useRecoilValue(tokenState);

  const handleCreateProfile = async () => {
    if (!name || !birth || !gender || !school || !grade) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    try {
      const profileData = { name, birth, gender, school, grade };
      const response = await axios.post(`${BASEURL}/children`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('프로필 생성 성공:', response);
      onClose();
    } catch (error) {
        console.log(token)
      console.log('프로필 생성실패:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>프로필 수정</h2>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setChildName(e.target.value)}
        />
        <input
          type="date" 
          placeholder="생년월일"
          value={birth}
          onChange={(e) => setChildBirth(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio" 
              name="gender"
              value="M"
              checked={gender === 'M'}
              onChange={(e) => setChildGender(e.target.value)}
            />
            남성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="W"
              checked={gender === 'W'}
              onChange={(e) => setChildGender(e.target.value)}
            />
            여성
          </label>
        </div>
        <input
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setChildSchool(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              name="grade"
              value="1"
              checked={grade === '1'}
              onChange={(e) => setChildGrade(e.target.value)}
            />
            1학년
          </label>
          <label>
            <input
              type="radio"
              name="grade"
              value="2"
              checked={grade === '2'}
              onChange={(e) => setChildGrade(e.target.value)}
            />
            2학년
          </label>
          <label>
            <input
              type="radio"
              name="grade"
              value="3"
              checked={grade === '3'}
              onChange={(e) => setChildGrade(e.target.value)}
            />
            3학년
          </label>
        </div>
        <button onClick={handleCreateProfile}>수정</button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateModal;
