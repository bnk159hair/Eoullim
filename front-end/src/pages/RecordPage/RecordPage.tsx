import { useState } from 'react';
import RecordListItem from '../../components/record/RecordListItem';
import { RecordPageContainer, Passwordcofile } from './RecordPageStyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import { BASEURL } from '../../apis/urls';

const RecordPage = () => {
  const [password, setPassword] = useState('');
  const token = useRecoilValue(tokenState);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const navigate = useNavigate();

  const passwordClick = () => {
    axios
      .post(
        `${BASEURL}/users/pw-check`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsPasswordCorrect(true);
      })
      .catch((error) => {
        alert('비밀번호를 확인해주세요.');
      });
  };

  const getRecord = () =>{
    axios
      .get(`${BASEURL}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=>{
        console.log('녹화영상 불러오기')
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const getBack = () => {
    navigate('/profile');
  };

  return (
    <RecordPageContainer>
      {isPasswordCorrect ? (
        <RecordListItem />
      ) : (
        <Passwordcofile>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={passwordClick}>확인</button>
        </Passwordcofile>
      )}
      <button onClick={getBack}>뒤로가기</button>
    </RecordPageContainer>
  );
};

export default RecordPage;
