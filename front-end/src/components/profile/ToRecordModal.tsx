import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { tokenState } from '../../atoms/Auth';
import { API_BASE_URL } from '../../apis/urls';
import { Profilekey } from '../../atoms/Profile';
import {
  ModalOverlay,
  ModalContent,
  FormContainer,
  ButtonContainer,
} from './ToRecordModalStyles';
import { Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';

interface ToRecordModalProps {
  onClose: () => void;
  childId: number;
}

const ToRecordModal: React.FC<ToRecordModalProps> = ({ onClose, childId }) => {
  const token = useRecoilValue(tokenState);
  const [password, setPassword] = useState('');
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);
  const navigate = useNavigate();

  const passwordCheck = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${API_BASE_URL}/users/pw-check`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProfileKey(childId);
        Swal.fire({
          text: '비밀번호가 확인되었습니다!',
          icon: 'success',
          confirmButtonText: '닫기',
        }).then(() => navigate('/record'));
      })
      .catch((error) => {
        Swal.fire({
          text: '비밀번호를 확인해주세요!',
          icon: 'error',
          confirmButtonText: '닫기',
        });
      });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <FormContainer onSubmit={passwordCheck}>
          <h2>비밀번호 확인</h2>
          <TextField
            label='비밀번호 확인'
            variant='outlined'
            margin='dense'
            type='password'
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <ButtonContainer>
            <Button
              variant='contained'
              size='small'
              sx={{ fontSize: '18px', margin: '0.5rem' }}
              onClick={passwordCheck}
              fullWidth>
              확인
            </Button>
            <Button
              variant='contained'
              size='small'
              sx={{ fontSize: '18px', margin: '0.5rem' }}
              onClick={onClose}
              fullWidth>
              닫기
            </Button>
          </ButtonContainer>
        </FormContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ToRecordModal;
