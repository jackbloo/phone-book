import styled from "@emotion/styled";
import { pixelSize } from "../../utils/constants";
import { device } from "../../utils";

export const Input = styled.input`
  background: 0;
  border: 0;
  outline: none;
  font-size: 15px;
  border-bottom: 1px solid black;
  padding-bottom: ${pixelSize.space_5};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    margin-top: 50px;
  }
`;
