import React,{useState} from 'react';
import RecordListItem from './../../components/Record/RecordListItem';
import {RecordPageContainer,Passwordcofile} from './Record.styles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Record = () => {
    const [password, setPassword] = useState('');
    const BASEURL = 'http://localhost:8080/api/v1';
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const navigate = useNavigate();

    const passwordClick = () =>{
        axios.post(`${BASEURL}/users/pw-check`, { password })
            .then((response) => {
                setIsPasswordCorrect(true);
            })
            .catch((error) => {
      
            alert('비밀번호를 확인해주세요.');
            });
    }

    const getBack = () => {
        navigate('/profile');
      };

    return (
        <RecordPageContainer>
            {isPasswordCorrect ? (<RecordListItem />) : (
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

export default Record;