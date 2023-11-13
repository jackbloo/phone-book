import styled from "@emotion/styled";
import { device } from "../../utils";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 150px));
  grid-column-gap: 40px;
  grid-row-gap: 10px;
  justify-content: center;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    height: calc(90vh + 40px);
    overflow-y: scroll;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-left: 10px;
    width: 100%;
  }
`;

export const Items = styled.div`
  position: relative;
  height: 240px;
  width: 150px;
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
  @media ${device.tablet} {
    width: 95%;
    flex-direction: row;
    height: 55px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  @media ${device.tablet} {
    margin-left: 20px;
    width: 150px;
  }
`;

export const Subtitle = styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${device.tablet} {
    display: none;
  }
`;

export const SubtitleDesktop = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
    font-size: 10px;
    margin-left: 15px;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Avatar = styled.img`
  height: 70px;
  width: 70px;
  margin-top: 15px;
  @media ${device.tablet} {
    margin-left: 15px;
    margin-top: 0px;
    height: 40px;
    width: 40px;
  }
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
  @media ${device.tablet} {
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 10px;
  }
`;

export const ActionsContainer = styled.div``;
export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media ${device.tablet} {
    width: 50%;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const FavoriteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
  top: 0px;
  @media ${device.tablet} {
    position: relative;
    right: 0px;
    justify-content: center;
    align-items: center;
  }
`;

export const MoreText = styled.span`
  color: #0f4c81;
  font-weight: 600;
`;

export const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px;
`;
