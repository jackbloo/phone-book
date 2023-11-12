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
  height: 20%;
  background-color: white;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 20px;
`;

export const Title = styled.div`
  font-weight: 700;
  color: black;
  font-size: 14px;
`;

export const TextAction = styled.div`
  color: black;
  font-size: 20px;
`;
export const TextNo = styled.div`
  color: red;
  font-size: 20px;
  font-weight: 600;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 10px;
`;
