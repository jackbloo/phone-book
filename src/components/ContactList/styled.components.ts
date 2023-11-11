import styled from "@emotion/styled";
import { device } from "../../utils";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  margin-bottom: 10px;
  @media ${device.tablet} {
    display: none;
  }
`;

export const Items = styled.div`
  position: relative;
  height: 220px;
  width: 170px;
  -webkit-box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  -moz-box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  border-radius: 20px;
  padding: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

export const Subtitle = styled.div`
  font-size: 10px;
`;

export const Avatar = styled.img`
  height: 70px;
  width: 70px;
  margin-top: 15px;
`;
export const Icon = styled.img`
  height: 30px;
  width: 30px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

export const FavoriteIcons = styled.img`
  height: 20px;
  width: 20px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

export const ActionsContainer = styled.div``;
export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const FavoriteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
`;
