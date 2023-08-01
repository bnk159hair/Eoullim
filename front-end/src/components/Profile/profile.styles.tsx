import styled from "styled-components";
import tw from "twin.macro";
import CreateBox from "../../assets/ecc/createprofile.png"

export const ProfileCreateBox=styled.div `
    height:300px;
    width:300px;
    background-image : url(${CreateBox});
    background-size: cover;
    border-radius: 30%;
`