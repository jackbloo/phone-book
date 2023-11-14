import React from "react";
import { findByText, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactList from "..";
import * as reactRedux from "react-redux";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";
import { mockFavoriteData, mockData } from "../mockData";

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});

describe("Unit testing of ContactList", () => {
  it("Should display not display when data are empty", () => {
    renderWithRedux(
      <ContactList contactList={[]} favoriteList={[]} />,
      initialState
    );
    waitFor(() =>
      expect(screen.queryByTestId("contactlist-container")).toBeNull()
    );
  });
  it("Should display data", () => {
    renderWithRedux(
      <ContactList
        contactList={[...mockData]}
        favoriteList={[...mockFavoriteData]}
      />,
      initialState
    );
    waitFor(() =>
      expect(screen.getByTestId("contactlist-container")).toBeInTheDocument()
    );
  });
  it("Should trigger handle delete", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ContactList
        contactList={[...mockData]}
        favoriteList={[...mockFavoriteData]}
      />,
      initialState
    );

    fireEvent.click(screen.getByTestId("delete-0"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should trigger handle edit", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ContactList
        contactList={[...mockData]}
        favoriteList={[...mockFavoriteData]}
      />,
      initialState
    );

    fireEvent.click(screen.getByTestId("edit-0"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should trigger handle favorite", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ContactList
        contactList={[...mockData]}
        favoriteList={[...mockFavoriteData]}
      />,
      initialState
    );

    fireEvent.click(screen.getByTestId("unfavorite-0"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should trigger handle unfavorite", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ContactList
        contactList={[...mockData]}
        favoriteList={[...mockFavoriteData]}
      />,
      initialState
    );

    fireEvent.click(screen.getByTestId("favorite-2"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
});
