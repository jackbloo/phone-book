import React, { memo } from "react";
import {
  Avatar,
  TitleContainer,
  Container,
  Menu,
  Logout,
  LogoutAvatar,
  TopContainer,
  BottomContainer,
} from "./styled.components";
import DummyAvatar from "../../assets/image/circle-avatar-white.svg";
import LogoutIcon from "../../assets/image/logout.svg";
import { LeftMenuProps } from "../../interface/reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../store/reducers";

const LeftMenu = ({ userName }: LeftMenuProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("phonebookPersistanceState");
    dispatch(setLogout());
    navigate("/");
  };
  return (
    <Container>
      <TopContainer>
        <TitleContainer>
          <Avatar src={DummyAvatar} alt="dummy-avatar" />
          Hi, {userName}!
        </TitleContainer>
        <Menu>Home</Menu>
      </TopContainer>
      <BottomContainer>
        <Logout>
          <LogoutAvatar
            src={LogoutIcon}
            alt="dummy-avatar"
            data-testid="logout"
            onClick={() => handleLogout()}
          />
        </Logout>
      </BottomContainer>
    </Container>
  );
};

export default memo(LeftMenu);
