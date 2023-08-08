import styled from 'styled-components';
import signupBoxBackground from '../../assets/box/woodbox.jpg';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  // width: 400px;
  // height: 500px;
  // background-image: url(${signupBoxBackground});
  background-color: #fff; /* 모달용 흰 배경 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* 모달용 그림자 효과 */
  max-width: 600px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    label {
      margin-right: 10px;
    }
  }

  button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
`;
