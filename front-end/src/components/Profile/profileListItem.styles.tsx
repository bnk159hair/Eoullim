import styled from "styled-components";
import tw from "twin.macro";
import ProfileBox from "../../assets/ecc/profile.png"

export const ProfileUsereBox=styled.div `
    height:300px;
    width:300px;
    background-image : url(${ProfileBox});
    background-size: cover;
    border-radius: 30%;
`