import styled from 'styled-components';
import mainBackground from '../../assets/background/main.gif'; // 이미지를 import 해옵니다.
import profileimg from '../../assets/ecc/profile.png'
import back from '../../assets/ecc/back.png'
import bear from '../../assets/animon/bear.png'
import fox from '../../assets/animon/fox.png'
import newfriend from '../../assets/ecc/newfriend.png'
import myfriend from '../../assets/ecc/myfriend.png'

export const MainPageContainer = styled.div`
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(${mainBackground}); // 이미지 경로를 문자열로 감싸줍니다.
  display: flex;
  flex-direction: column;
`;

export const ProfileImg = styled.div`
  background-size: 100% 100%;
  width: 80px;
  height: 80px;
  margin-left: auto;
  background-color: #87CEFA;
  border-radius: 25px;
  border: solid 2px;
  cursor:pointer;
  &:hover {
    transform: scale(1.1);
}
`;

export const MarginContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

export const MainCharacter = styled.div`
  width: 200px;
  height: 200px;
  cursor:pointer;
  background-size: 100% 100%;
  margin-top: 380px; 
  &:hover {
    transform: scale(1.1);
  }
`

export const BackIcon = styled.div`
  background-size: 100% 100%;
  cursor:pointer;
  width: 80px;
  height: 80px;
  margin-right: auto;
  background-image: url(${back});
  &:hover {
      transform: scale(1.1);
  }
`
export const ChaterLocation = styled.div`  
  display: flex;
  height: 1000px;
  justify-content: space-between;
`
export const NewFriend = styled.div`
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
  background-image: url(${bear});
  margin-left: 90px;
  margin-top: 90px;
`
export const NewFirendsignpost = styled.div`
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  background-image: url(${newfriend}); 
  margin-left: 120px;
  margin-top: 280px;
  transform: rotate(15deg);
`
export const MyFriend = styled.div`
  width: 200px;
  height: 200px;
  background-size: 100% 100%;
  background-image: url(${fox});
  margin-right: 90px;
  margin-top: 90px;
  background-size: cover;

`

export const MyFirendsignpost = styled.div`
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  background-image: url(${myfriend});
  margin-right: 140px;
  margin-top: 270px;
  background-size: cover;
  transform: rotate(347deg);

`
export const HoberLeft = styled.div`
  width: 580px;
  display: flex;
  cursor:pointer;
  &:hover {
    ${NewFirendsignpost}, ${NewFriend} {
      transform: scale(1.5);
    }
  }
`
export const HoberRight = styled.div`
  width: 580px; 
  display: flex;
  justify-content: flex-end;
  cursor:pointer;
  &:hover {
    ${MyFirendsignpost}, ${MyFriend} {
      transform: scale(1.5);
    }
  }
`;

