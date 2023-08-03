import styled from "styled-components";
import tw from "twin.macro";
import recordBackground from "../../assets/background/record.gif";
import passwordbox from "../../assets/box/passwordbox.png"

export const RecordPageContainer = styled.div`
    height: 100vh;
    background-size: 100% 100%;
    background-image: url(${recordBackground});
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    
`;

export const Passwordcofile = styled.div`
    height : 500px;
    width : 900px; 
    background-image: url(${passwordbox});
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
`