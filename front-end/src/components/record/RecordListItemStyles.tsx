import styled from 'styled-components';
import RecordBox from '../../assets/box/woodbox.jpg'
import Record from '../../assets/ecc/record.png'

export const RecordItemContainer= styled.div`
    height : 250px;
    width: 1100px;
    background-image: url(${RecordBox});
    background-size: cover;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content : space-around;        
`

export const RecordProfileImg = styled.div`
    height : 200px;
    width : 200px;
    background-size: 100% 100%;
    background-color: #87CEFA;
    border-radius: 25px;
    border: solid 2px;
`

export const OpponentImformation = styled.div`
    height : 200px;
    width : 600px;
    background-color: white;
    border-radius: 25px;
    border: solid 2px;
    display: flex;
    flex-direction: column;
    div {
        margin: 5px 0;
    }
`

export const RecordUrl = styled.div`
    height : 200px;
    width : 200px;
    background-size: 100% 100%;
    background-image: url(${Record});

`