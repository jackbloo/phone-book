import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { pixelSize } from "../../utils/constants";
import { device } from "../../utils";

export const Container = styled.div`
  height: ${pixelSize.fullHeight};
  width: ${pixelSize.fullWidth};
  background: linear-gradient(white, #7bb8c0);
`;

export const ImageBook = styled.img`
  width: ${pixelSize.space_200};
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${pixelSize.height_70};
`;

export const NameContainer = styled.div`
  font-size: ${pixelSize.space_14};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  background: 0;
  border: 0;
  outline: none;
  font-size: 1.5em;
  border-bottom: 1px solid black;
  padding-bottom: ${pixelSize.space_5};
  ::placeholder {
    color: black;
    opacity: 1; /* Firefox */
  }
`;

export const Image = styled.img<{ isError?: boolean }>`
  width: ${pixelSize.space_20};
  height: ${pixelSize.space_20};
  margin-left: ${(props) => (props.isError ? 0 : pixelSize.space_10)};
  margin-right: ${(props) => (props.isError ? pixelSize.space_5 : 0)};
`;

export const ErrorContainer = styled.div`
  margin-top: ${pixelSize.space_5};
  color: red;
  display: flex;
  align-items: flex-start;
`;
const typing = keyframes`
  from { width: 0 }   to { width: 30% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: orange; }`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: black;
  margin-bottom: 10px;
  overflow: hidden;
  border-right: 0.15em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: ${typing} 3.5s steps(40, end),
    ${blinkCaret} 0.75s step-end infinite;
  @media ${device.tablet} {
    font-size: 20px;
  }
`;
