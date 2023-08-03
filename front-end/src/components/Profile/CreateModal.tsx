import React, { useState } from 'react';
import axios from 'axios';
import { ModalOverlay, ModalContent } from './CreateModal.styles';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import {BASEURL} from '../../apis/api'

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
  const [name, setChildName] = useState('');
  const [birth, setChildBirth] = useState('');
  const [gender, setChildGender] = useState(''); 
  const [school, setChildSchool] = useState('');
  const [grade, setChildGrade] = useState('');
  const [resultCode, setIsresultCode] = useState(false);
  const token = useRecoilValue(tokenState);

  const handleCreateProfile = async () => {
    if (!resultCode) {
      alert("학교 확인을 해주세요");
      return;
    }
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

  const handleSchoolCheck = async () => {
    try {
      const response = await axios.post(`${BASEURL}/children/school`, {
        keyword: school  
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsresultCode(response.data.resultCode);
      
      alert(response.data.resultCode ? "올바른 학교정보입니다" : "다시 입력해주세요");
    } catch (error) {
      console.error(error);
      alert("잘못된 입력입니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>프로필 생성</h2>
        이름
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setChildName(e.target.value)}
        />
        생년월일
        <input
          type="date" 
          placeholder="생년월일"
          value={birth}
          onChange={(e) => setChildBirth(e.target.value)}
        />
        성별
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
        학교
        <input
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setChildSchool(e.target.value)}
        />
        <button onClick={handleSchoolCheck}>학교 확인</button>
        {resultCode && (
          <div style={{ color: "green" }}>학교 등록이 완료되었습니다.</div>
        )}
        <div>
          학년
        </div>
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
        <button onClick={handleCreateProfile}>생성</button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateModal;
