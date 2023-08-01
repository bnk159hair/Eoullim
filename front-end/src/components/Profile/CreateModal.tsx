import React,{useState} from 'react';
import axios from "axios";
import tw from 'twin.macro';
import styled from 'styled-components'
import {ModalOverlay,ModalContent} from './CreateModal.styles'


interface CreateModalProps {
    onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
    const [name , setChildName] = useState("");
    const [birth , setChildBirth] = useState("");
    const [gender , setChildGender] = useState("");
    const [school , setChildSchool] = useState("");
    const [grade , setChildGrade] = useState("");
    const BASEURL = 'http://localhost:8080/api/v1';

    const handleCreateProfile = async() =>{
        if (!name || !birth || !gender || !school || !grade){
            alert("모든 정보를 입력해주세요.")
            return
        }

        try {
            const profileData = {name,birth,gender,school,grade};
            const response = await axios.post(`${BASEURL}/children`,profileData);
            console.log("프로필 생성 성공:",response)
            onClose();
        } catch(error){
            console.log("프로필 생성실패:",error)
        }
    }
    return (
        <ModalOverlay>
            <ModalContent>
                <h2>프로필 생성</h2>
                <input 
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e)=>setChildName(e.target.value)}
                />
                <input 
                type="text"
                placeholder="생년월일"
                value={birth}
                onChange={(e)=>setChildBirth(e.target.value)}
                />
                <input 
                type="text"
                placeholder="성별"
                value={gender}
                onChange={(e)=>setChildGender(e.target.value)}
                />
                <input 
                type="text"
                placeholder="학교"
                value={school}
                onChange={(e)=>setChildSchool(e.target.value)}
                />
                <input 
                type="text"
                placeholder="학년"
                value={grade}
                onChange={(e)=>setChildGrade(e.target.value)}
                />
                <button onClick={handleCreateProfile}>생성</button>
                <button onClick={onClose}>닫기</button>
            </ModalContent>
        </ModalOverlay>
    );
};

export default CreateModal;