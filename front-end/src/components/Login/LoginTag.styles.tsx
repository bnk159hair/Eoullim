import styled from "styled-components";
import tw from "twin.macro";
import LoginBox from "../../assets/box/loginbox.png"

export const LoginTagContainer = styled.div`
    width: 560px;
    height: 300px;
    padding: 50px;      
    background-size: cover;
    background-image: url(${LoginBox}); // 이미지 경로를 문자열로 감싸줍니다.
`;
export const LoginInput = styled.input`
width : 200px
padding: 60px
${tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
`