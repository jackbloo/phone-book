import React from "react";
import { findByText, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteModal from "..";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});
jest.mock("../../../apolloClient/index.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { query: jest.fn, mutate: jest.fn };
  });
});

describe("Unit testing of DeleteModal", () => {
  it("Should display when deletemodal is visible", () => {
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    renderWithRedux(<DeleteModal handleRefetch={jest.fn} />, newInitialState);
    waitFor(() =>
      expect(screen.getByTestId("delete-modal-container")).toBeInTheDocument()
    );
  });
  it("Should not display when deletemodal is not visible", () => {
    renderWithRedux(<DeleteModal handleRefetch={jest.fn} />, initialState);
    waitFor(() =>
      expect(screen.queryByTestId("delete-modal-container")).toBeNull()
    );
  });
  it("Should diplay title", () => {
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    renderWithRedux(<DeleteModal handleRefetch={jest.fn} />, newInitialState);
    waitFor(() =>
      expect(
        screen.getByText("Do you want to delete this contact?")
      ).toBeInTheDocument()
    );
  });
  it("Should trigger onClose", () => {
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<DeleteModal handleRefetch={jest.fn} />, newInitialState);
    fireEvent.click(screen.getByTestId("onClose"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should trigger handleDelete", () => {
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<DeleteModal handleRefetch={jest.fn} />, newInitialState);
    fireEvent.click(screen.getByTestId("handleDelete"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
});
