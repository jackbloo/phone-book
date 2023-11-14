import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LeftMenu from "..";
import * as reactRedux from "react-redux";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Unit testing of Left Menu", () => {
  it("Should display hi", () => {
    renderWithRedux(<LeftMenu userName="test" />, { ...initialState });
    waitFor(() => expect(screen.findByText("Hi, test")).toBeInTheDocument());
  });
  it("Should display home", () => {
    renderWithRedux(<LeftMenu userName="test" />, { ...initialState });
    waitFor(() => expect(screen.findByText("Home")).toBeInTheDocument());
  });
  it("Should trigger handlelogout", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<LeftMenu userName="test" />, { ...initialState });
    fireEvent.click(screen.getByTestId("logout"));
    waitFor(() => expect(mockUseDispatch).toHaveBeenCalled());
  });
});
