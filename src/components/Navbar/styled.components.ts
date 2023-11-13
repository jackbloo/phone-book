import styled from "@emotion/styled";
import { device } from "../../utils";
import { colorPalette, pixelSize } from "../../utils/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${pixelSize.fullWidth};
  -webkit-box-shadow: 0px -2px 24px 8px ${colorPalette.silver};
  -moz-box-shadow: 0px -2px 24px 8px ${colorPalette.silver};
  box-shadow: 0px -2px 24px 8px ${colorPalette.silver};
  padding: 5px;
  font-size: 12px;
  background: white;
  @media ${device.tablet} {
    justify-content: flex-start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightContent = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

export const ImageIcon = styled.img`
  width: ${pixelSize.space_20};
  height: ${pixelSize.space_20};
`;
