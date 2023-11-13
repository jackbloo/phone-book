import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "..";
import { initialState } from "../../../store/reducers";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Unit testing of navbar", () => {
  it("Should display YourPhoneBook", () => {
    render(<Navbar isLogin={false} dispatch={jest.fn()} />);
    expect(screen.findByText("YourPhoneBook"));
  });
  it("Should trigger logout", () => {
    const mockDispatch = jest.fn();
    render(<Navbar isLogin={true} dispatch={mockDispatch} />);
    fireEvent.click(screen.getByTestId("logout-navbar"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should not display logout icon when not yet logged in", () => {
    const mockDispatch = jest.fn();
    render(<Navbar isLogin={false} dispatch={mockDispatch} />);
    expect(screen.queryByTestId("logout-icon")).toBeNull();
  });
  it("Should display logout icon when logged in", () => {
    const mockDispatch = jest.fn();
    render(<Navbar isLogin={true} dispatch={mockDispatch} />);
    expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
  });
});
