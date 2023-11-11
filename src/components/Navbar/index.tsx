import React from "react";
import {
  Container,
  LeftContent,
  RightContent,
  ImageIcon,
} from "./styled.components";
import BookIcon from "../../assets/image/phoneBook.png";

const Navbar = () => {
  return (
    <Container>
      <LeftContent>
        <ImageIcon src={BookIcon} />
        YourPhoneBook
      </LeftContent>
      <RightContent></RightContent>
    </Container>
  );
};

export default Navbar;
