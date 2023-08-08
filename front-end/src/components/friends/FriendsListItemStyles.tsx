import styled from 'styled-components';

export const FriendCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px; /* Larger border-radius for rounded corners */
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* Adjust the width as needed */
  height: 500px; /* Adjust the height as needed */
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FriendImg = styled.div`
  width: 200px; /* Larger width for the image */
  height: 200px; /* Larger height for the image */
  background-size: cover;
  background-position: center;
  border-radius: 16px; /* Larger border-radius for rounded corners */
  border: 2px solid #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FrinedInfo = styled.div`
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
`;
