import React from "react";
import { Container, ContentContainer } from "./styled.components";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <Container>
      <Navbar />
      <ContentContainer>Contact List</ContentContainer>
    </Container>
  );
};

export default Home;
