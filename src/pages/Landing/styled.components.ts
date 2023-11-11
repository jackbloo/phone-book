import styled from "@emotion/styled";
import { pixelSize } from "../../utils/constants";

export const Container = styled.div`
  height: ${pixelSize.fullHeight};
  width: ${pixelSize.fullWidth};
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
