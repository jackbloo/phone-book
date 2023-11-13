import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Shimmer from "..";

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

describe("Unit testing of Shimmer", () => {
  it("Should display hi", () => {
    render(<Shimmer />);
    waitFor(() =>
      expect(screen.findByTestId("shimmer-container")).toBeInTheDocument()
    );
  });
});
