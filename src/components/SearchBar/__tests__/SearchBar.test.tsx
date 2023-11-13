import React from "react";
import { findByText, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "..";
import * as reactRedux from "react-redux";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});
jest.mock("lodash.debounce", () => {
  return {
    __esModule: true,
    ...jest.requireActual("lodash.debounce"),
    default: () => jest.fn(),
  };
});

describe("Unit testing of SearchBar", () => {
  it("Should display input", () => {
    renderWithRedux(<SearchBar />, initialState);
    waitFor(() =>
      expect(screen.findByTestId("input-container")).toBeInTheDocument()
    );
  });
  it("Should Trigger handlechange", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<SearchBar />, initialState);
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "test" },
    });
    waitFor(() => expect(mockUseDispatch).toHaveBeenCalled());
    waitFor(() => expect(screen.findByText("test")).toBeInTheDocument());
  });
});
