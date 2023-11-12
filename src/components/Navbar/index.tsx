import React, { useCallback } from "react";
import {
  Container,
  LeftContent,
  RightContent,
  ImageIcon,
} from "./styled.components";
import BookIcon from "../../assets/image/phoneBook.png";
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
        <RightContent onClick={(e) => handleLogout()}>Logout</RightContent>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default React.memo(Navbar);
