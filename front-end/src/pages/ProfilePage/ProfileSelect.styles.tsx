import styled from "styled-components";
import tw from "twin.macro";
import loginBackground from "../../assets/background/login.gif";
import password from "../../assets/ecc/password.png"

export const ProfileSelectPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${loginBackground});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PasswordChange = styled.div`
    background-size: 100% 100%;
    background-image: url(${password});
    width : 80px;
    height: 80px;
    margin-left: auto;
    `;

export const MarginContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: flex-end;
    button {
        font-size: 24px;
        background-color: red;
        color: white;
        border-radius: 10px;
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #c90000;
      }
`