import React from "react";
import { fireEvent, getByText, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "..";
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
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Unit testing of Landing Page", () => {
  it("Should display welcome", () => {
    renderWithRedux(<Landing />, { ...initialState });
    waitFor(() =>
      expect(
        screen.findByText("Welcome to the best Phonebook")
      ).toBeInTheDocument()
    );
  });
  it("Should trigger submit and return incorrect name", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<Landing />, { ...initialState });
    fireEvent.click(screen.getByTestId("submit-name"));
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(screen.getByText("Please insert correct name")).toBeInTheDocument();
  });
  it("Should trigger submit correct name and return no error", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<Landing />, { ...initialState });
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("submit-name"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.queryByTestId("Please insert correct name")).toBeNull();
  });
});
