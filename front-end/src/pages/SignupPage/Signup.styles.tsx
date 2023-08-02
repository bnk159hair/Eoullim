import styled from "styled-components";
import tw from "twin.macro";
import loginBackground from "../../assets/background/login.gif"; // 이미지를 import 해옵니다.
import signupBoxBackground from "../../assets/box/메뉴판.jpg"

export const SignupPageContainer = styled.div`
    height: 100vh;
    background-size: 100% 100%;
    background-image: url(${loginBackground});
    display: flex;
    justify-content:center; 
    align-items : center;
`;
export const SignupTagContainer = styled.div`
   height : 500px;
   width : 400px;
   background-image: url(${signupBoxBackground});
   border: solid 2px;
   border-radius: 8px;
   display: flex;
   justify-content:center; 
   align-items : center;
`;
