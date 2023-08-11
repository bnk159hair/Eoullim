import styled from 'styled-components';
import RecordBox from '../../assets/box/woodbox.jpg'
import Record from '../../assets/ecc/record.png'
import Opponentbox from '../../assets/box/record.png'

export const RecordItemContainer= styled.div`
    height : 250px;
    width: 800px;
    background-image: url(${RecordBox});
    background-size: cover;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content : space-around;
    margin: 10px;        
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
    width : 300px;
    background-size: 100% 100%;
    background-image: url(${Opponentbox});
    // background-color: white;
    display: flex;
    justify-content : center;
    flex-direction: column;
    div {
        margin: 9px 20px;
        font-weight: bold;
        font-family: 'omyu_pretty';
        font-size: 20px;
    }
`

export const RecordUrl = styled.div`
    height : 200px;
    width : 200px;
    background-size: 100% 100%;
    background-image: url(${Record});
    &:hover {
        transform: scale(1.1);
      } 

`