import styled from "@emotion/styled";
import { device } from "../../utils";

export const TitleContainer = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const Avatar = styled.img`
  height: 50px;
  width: 50px;
  margin-top: 15px;
`;

export const Container = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    background: #7bb8c0;
    width: 20%;
    justify-content: space-between;
  }
`;

export const Menu = styled.div`
  color: #7bb8c0;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin-top: 20px;
  padding: 5px;
`;

export const Logout = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const LogoutAvatar = styled.img`
  height: 25px;
  width: 25px;
  margin-top: 15px;
`;

export const TopContainer = styled.div``;

export const BottomContainer = styled.div``;
