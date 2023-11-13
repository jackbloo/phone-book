import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { device } from "../../utils";

const loadingSkeleton = keyframes`
    100% {
      transform: translateX(100%);
    }
  `;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-around;
  @media ${device.tablet} {
    flex-direction: column;
    height: calc(90vh + 40px);
    overflow-y: scroll;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;
export const Items = styled.div`
  -webkit-box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  -moz-box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  box-shadow: 0px 0px 24px -9px rgba(192, 192, 192, 1);
  height: 240px;
  width: 150px;
  border-radius: 20px;
  padding: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  @media ${device.tablet} {
    width: 95%;
    flex-direction: row;
    height: 55px;
  }
`;
export const ShimmerCircle = styled.div`
  background-color: #ebebeb;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  position: relative;
  margin-top: 20px;
  @media ${device.tablet} {
    margin-left: 15px;
    margin-top: 0px;
    height: 40px;
    width: 40px;
  }

  ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 200px;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, #ebebeb, #f5f5f5, #ebebeb);
    transform: translateX(-100%);
    animation: ${loadingSkeleton} 1.5s ease-in-out infinite;
  }
`;
export const ShimmerTitle = styled.div`
  background-color: #ebebeb;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 10%;
  width: 100px;
  height: 12px;
  position: relative;
  margin-top: 5px;
  @media ${device.tablet} {
    margin-left: 15px;
  }

  ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 200px;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, #ebebeb, #f5f5f5, #ebebeb);
    transform: translateX(-100%);
    animation: ${loadingSkeleton} 1.5s ease-in-out infinite;
  }
`;
export const ShimmerSquare = styled.div`
  background-color: #ebebeb;
  display: inline-flex;
  line-height: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 10%;
  width: 40px;
  height: 30px;
  position: relative;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;

  ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 200px;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, #ebebeb, #f5f5f5, #ebebeb);
    transform: translateX(-100%);
    animation: ${loadingSkeleton} 1.5s ease-in-out infinite;
  }
`;
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

export const ActionContainer = styled.div``;
