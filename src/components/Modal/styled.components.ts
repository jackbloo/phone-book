import styled from "@emotion/styled";
import { device } from "../../utils";

export const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
`;

export const ModalContent = styled.div`
  width: 300px;
  height: 40%;
  background-color: white;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  border-radius: 20px;
  padding: 15px;
`;

export const Title = styled.div`
  font-weight: 700;
  color: black;
  font-size: 20px;
`;

export const TextAction = styled.div`
  color: red;
  font-size: 14px;
  border: 1px solid red;
  padding: 5px;
  border-radius: 15px;
`;
export const TextNo = styled.div`
  color: black;
  font-size: 14px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 15px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 10px;
`;

export const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow: auto;
  height: 250px;
`;

export const Input = styled.input`
  outline: none;
  margin-bottom: 5px;
`;
export const Label = styled.label`
  color: black;
  font-size: 14px;
`;
export const ErrorLabel = styled.label`
  color: red;
  font-size: 12px;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExtraButton = styled.div`
  color: blue;
  font-size: 10px;
  text-align: center;
`;

export const RemovePhoneNumber = styled.span`
  color: red;
  font-size: 10px;
`;

export const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
