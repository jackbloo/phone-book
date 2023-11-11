import styled from "@emotion/styled";
import { pixelSize } from "../../utils/constants";

export const Container = styled.div`
  width: ${pixelSize.fullWidth};
  position: relative;
`;

export const ContentContainer = styled.div`
  margin-top: ${pixelSize.space_20};
  padding: ${pixelSize.space_10};
  font-weight: 600;
`;

export const PlusButton = styled.div`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  position: fixed;
  bottom: 0;
  background-color: #89cff0;
  display: flex;
  color: white;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 50px;
  z-index: 999;
`;

export const TitleContainer = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
`;

export const Avatar = styled.img`
  height: 50px;
  width: 50px;
  margin-top: 15px;
`;

export const MoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const MoreButton = styled.div`
  max-width: 100px;
  padding: 10px;
  border: 1px solid black;
`;
