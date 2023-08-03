import React, {useState} from 'react';
import axios from 'axios';
import ProfileList from '../../components/Profile/ProfileList';
import {ProfileSelectPageContainer, PasswordChange, MarginContainer } from './ProfileSelect.styles'
import ChagePasswordModal from '../../components/Profile/ChagePasswordModal';
import {BASEURL} from '../../apis/api'
import { tokenState } from '../../atoms/Auth';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ProfileSelect = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const token = useRecoilValue(tokenState);
    const navigate = useNavigate();
  

    const handleModalOpen = () => {
        setModalOpen(true);
      };
    
    const handleModalClose = () => {
      setModalOpen(false);
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
          console.log(token)
          console.log(response)
          navigate('/login')

        })
        .catch((error)=>{
          console.log(token)
          console.log('로그아웃 오류:',error)
          navigate('/login')
        })
    }
    
    return (
        <ProfileSelectPageContainer>
          <MarginContainer>
            <PasswordChange onClick={handleModalOpen}/>
          </MarginContainer>
            {isModalOpen && <ChagePasswordModal onClose={handleModalClose} />}
            <ProfileList/>
          <MarginContainer>
            <button onClick={logoutClick}>로그아웃</button>
          </MarginContainer>
        </ProfileSelectPageContainer>
    );
};

export default ProfileSelect;
