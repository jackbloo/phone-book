import React, { useCallback, memo } from "react";
import {
  Container,
  LeftContent,
  RightContent,
  ImageIcon,
} from "./styled.components";
import BookIcon from "../../assets/image/Phonebook.webp";
import LogoutIcon from "../../assets/image/logout-black.svg";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../store/reducers";
import { RootDispatch } from "../../store/store";

const Navbar = ({
  isLogin,
  dispatch,
}: {
  isLogin: boolean;
  dispatch: RootDispatch;
}) => {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("phonebookPersistanceState");
    dispatch(setLogout());
    navigate("/");
  }, [dispatch, navigate]);
  return (
    <Container>
      <div> </div>
      <LeftContent>
        <ImageIcon src={BookIcon} alt="book-icon" />
        YourPhoneBook
      </LeftContent>
      {isLogin ? (
        <RightContent
          onClick={(e) => handleLogout()}
          data-testid="logout-navbar"
        >
          {" "}
          <ImageIcon
            src={LogoutIcon}
            alt="logout-icon"
            data-testid="logout-icon"
          />
        </RightContent>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default memo(Navbar);
