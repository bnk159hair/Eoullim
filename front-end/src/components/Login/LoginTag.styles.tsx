import styled from "styled-components";
import tw from "twin.macro";
import LoginBox from "../../assets/box/loginbox.png";

export const LoginTagContainer = styled.div`
    width: 560px;
    height: 300px;
    padding: 50px;
    background-size: cover;
    background-image: url(${LoginBox});
    display: grid;
    grid-template-columns: 300px 100px;
    gap: 10px;
    justify-content: space-evenly;
    align-content: center;
`;

export const LoginInput = styled.input`
  width: 250px;
  padding: 10px;
  border: solid 2px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`;

export const LoginButton = styled.button`
  ${tw`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4`}

`;
