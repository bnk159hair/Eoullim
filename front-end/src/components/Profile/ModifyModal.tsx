import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ModalOverlay, ModalContent } from './ModifyModal.styles';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import {BASEURL} from '../../apis/api'

interface ChildProfile {
  id: number;
  name: string;
  birth: number;
  gender: string;
  school: string;
  grade: number;
  status: string;
}

interface ModifyModalProps {
  onClose: () => void;
  ChildId:number;
  resetList: () => void;
}

const ModifyModal: React.FC<ModifyModalProps> = ({ onClose,ChildId,resetList }) => {
  const [childProfile, setChildProfile] = useState<ChildProfile>({
    id: 0,
    name: '',
    birth: 0,
    gender: '',
    school: '',
    grade: 0,
    status: '',
  });


  const token = useRecoilValue(tokenState);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    fetchChildProfile();
  }, [ChildId, token]);

  const fetchChildProfile = () => {
    axios
      .get(`${BASEURL}/children/${ChildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        setChildProfile(response.data.result);
      })
      .catch((error) => {
        console.log('아이 프로필을 불러오는데 실패했습니다:', error);
      });
  };

  const passwordClick = () => {
    axios
      .post(`${BASEURL}/users/pw-check`, { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsPasswordCorrect(true);
      })
      .catch((error) => {
        alert('비밀번호를 확인해주세요.');
      });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${BASEURL}/children/${childProfile.id}`,
        childProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('프로필 수정 성공:', response);
      resetList();
      onClose();
    } catch (error) {
      console.log('프로필 수정 실패:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChildProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const convertTimestampToKoreanDate = (timestamp: number) => {
    const utcDate = new Date(timestamp);
    const koreaTimezoneOffset = 9 * 60; 
    const koreaDate = new Date(utcDate.getTime() + koreaTimezoneOffset * 60 * 1000);
    const koreanDateString = koreaDate.toISOString().slice(0, 10);
    return koreanDateString;
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>프로필 수정</h2>
        {!isPasswordCorrect ? (
          <>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={passwordClick}>확인</button>
            <button onClick={onClose}>닫기</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="이름"
              name="name"
              value={childProfile.name}
              onChange={handleInputChange}
            />
            <input
              type="date"
              placeholder="생년월일"
              name="birth"
              value={convertTimestampToKoreanDate(childProfile.birth)}
              onChange={handleInputChange}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={childProfile.gender === 'M'}
                  onChange={handleInputChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="W"
                  checked={childProfile.gender === 'W'}
                  onChange={handleInputChange}
                />
                여성
              </label>
            </div>
            <input
              type="text"
              placeholder="학교"
              name="school"
              value={childProfile.school}
              onChange={handleInputChange}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="1"
                  checked={childProfile.grade === 1}
                  onChange={handleInputChange}
                />
                1학년
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="2"
                  checked={childProfile.grade === 2}
                  onChange={handleInputChange}
                />
                2학년
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="3"
                  checked={childProfile.grade === 3}
                  onChange={handleInputChange}
                />
                3학년
              </label>
            </div>
            <button onClick={handleUpdateProfile}>수정</button>
            <button onClick={onClose}>닫기</button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModifyModal;
