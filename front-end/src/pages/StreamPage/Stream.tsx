import React from 'react';
import WaitTag from '../../components/Stream/WaitTag';
import ViedoTag from '../../components/Stream/ViedoTag';
import CanvasTag from '../../components/Stream/CanvasTag';
import { useNavigate } from 'react-router-dom';

const Stream = () => {

    const navigate = useNavigate();
    
    const handleMainClick = () => {
        navigate('/'); 
      };

    return (
        <div>
            곰돌이 가이드 넣기
            <WaitTag/>
            <ViedoTag/>
            <CanvasTag/>
            <button onClick={handleMainClick}>나가기</button>
        </div>
    );
};

export default Stream;