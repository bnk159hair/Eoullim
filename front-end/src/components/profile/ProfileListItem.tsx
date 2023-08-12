import React, { useState } from "react";
import {
  ProfileUserContainer,
  NameTag,
  ButtonContainer,
} from "./ProfileListItemStyles";
import ModifyModal from "./ModifyModal";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../apis/urls";
import axios from "axios";
import { tokenState, userState } from "../../atoms/Auth";
import { Profilekey } from "../../atoms/Profile";
import { useRecoilValue, useRecoilState } from "recoil";
import { Button } from "@mui/material";
import ToRecordModal from "./ToRecordModal";

interface ProfileListItemProps {
  name: string;
  childId: number;
  resetList: () => void;
  imgurl: string;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  name,
  childId,
  resetList,
  imgurl,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const token = useRecoilValue(tokenState);
  const [profilekey, setProfileKey] = useRecoilState(Profilekey);
  const [userName, setUserName] = useRecoilState(userState);
  const navigate = useNavigate();
  const IMGURL = `/${imgurl}.png`;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMainClick = () => {
    console.log(childId, name);
    setProfileKey(childId);
    setUserName(name);
    profileLogin();
    navigate("/");
  };

  const profileLogin = () => {
    axios
      .post(
        `${API_BASE_URL}/children/login/${childId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("프로필로그인");
      })
      .catch((error) => {
        console.log("프로필 로그인 오류", error);
      });
  };

  const handleRecordOpen = () => {
    setIsRecordOpen(true);
  };

  const handleRecordClose = () => {
    setIsRecordOpen(false);
  };

  return (
    <>
      <div>
        <ProfileUserContainer
          style={{ backgroundImage: `url(${IMGURL})` }}
          onClick={handleMainClick}
        >
          <NameTag>{name}</NameTag>
        </ProfileUserContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            sx={{ fontSize: "18px", paddingX: "2rem" }}
            onClick={handleModalOpen}
          >
            프로필 관리
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: "18px", paddingX: "2rem" }}
            onClick={handleRecordOpen}
          >
            녹화영상
          </Button>
        </ButtonContainer>
      </div>
      {isModalOpen && (
        <ModifyModal
          onClose={handleModalClose}
          childId={childId}
          resetList={resetList}
        />
      )}
      {isRecordOpen && (
        <ToRecordModal onClose={handleRecordClose} childId={childId} />
      )}
    </>
  );
};

export default ProfileListItem;
