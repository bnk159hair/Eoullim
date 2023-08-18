import styled from 'styled-components';
import emptyfriend from '../../assets/ecc/emptyfriend.png'
import before from '../../assets/ecc/before.png'
import after from '../../assets/ecc/after.png'
import friendlist from '../../assets/box/friendlist.png'

export const EmptyFriend = styled.div`
  height : 400px;
  width : 800px;
  background-image: url(${emptyfriend});
  background-size: 100% 100%;
`
export const FriendsListContent = styled.div`
  display: flex;
  flexWrap: wrap;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height : 500px;
  background-image: url(${friendlist});
  background-size: 100% 100%;
`

export const BeforeButton = styled.div`
  height : 80px;
  width : 80px;
  background-image: url(${before});
  background-size: cover;
  cursor:pointer;
  &:hover {
    transform: scale(1.25);
  }
`

export const AfterButton = styled.div`
  height : 80px;
  width : 80px;
  background-image: url(${after});
  background-size: cover;
  cursor:pointer;
  &:hover {
    transform: scale(1.25);
  }
`