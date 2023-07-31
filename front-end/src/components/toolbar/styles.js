import styled, { css } from "styled-components";

export const Header = styled.div`
  color: #ffffff;
  height: 40px;
  background-color: #333333;
  padding: 0 14px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
  min-width: 400px !important;

  &.headerLight {
    color: #706969 !important;
    background-color: #eeeeee !important;
  }
`;

export const NavSessionInfo = styled.div`
  position: absolute;
`;

export const NavButtons = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  min-width: 400px;
`;

export const NavChatButton = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
`;

export const TitleContent = styled.div`
  max-width: 100px;
  background-color: #494949;
  margin: 5px -18px;
  padding: 0px 15px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  float: right;
  margin-top: 20px;

  &.titleContentLight {
    background-color: #dfdfdf !important;
    color: #000;
  }
`;

export const HeaderImage = styled.img`
  max-width: 135px;
  margin-right: 10px;
  margin-top: 10px;
`;

export const SessionTitle = styled.span`
  font-family: "Open Sans", sans-serif;
`;

export const Point = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 12px;
  right: 33px;
  border-radius: 50%;
  background-color: #ffa600;
  border: 1px solid #000;
  z-index: 99999;

  ${(props) =>
    props.isLight &&
    css`
      border: 1px solid #ffffff !important;
    `}
`;

export const MobileResponsive = css`
  @media only screen and (max-width: 700px) {
    ${TitleContent}, ${NavChatButton} {
      display: none;
    }
  }
`;
