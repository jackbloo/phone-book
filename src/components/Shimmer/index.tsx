import React from "react";
import {
  Container,
  ShimmerCircle,
  ShimmerTitle,
  TopContainer,
  ActionContainer,
  ShimmerSquare,
  Items,
} from "./styled.components";

const Shimmer = () => {
  return (
    <Container data-testid="shimmer-container">
      {new Array(10).fill("").map((el, index) => (
        <Items key={index}>
          <TopContainer>
            <ShimmerCircle />
            <ShimmerTitle />
            <ShimmerTitle />
          </TopContainer>
          <ActionContainer>
            <ShimmerSquare />
            <ShimmerSquare />
          </ActionContainer>
        </Items>
      ))}
    </Container>
  );
};

export default Shimmer;
