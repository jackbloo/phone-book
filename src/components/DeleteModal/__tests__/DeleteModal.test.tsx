import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteModal from "..";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";
import * as reactRedux from "react-redux";
import { createMockClient } from "mock-apollo-client";
import { ApolloProvider } from "@apollo/client";
import { DELETE_CONTACT_PHONE } from "../../../apolloClient/queries";

const mockClient = createMockClient();
jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});
jest.mock("../../../utils/url", () => ({
  __esModule: true,
  getAPIUrl: jest.fn(() => "hi"),
}));

describe("Unit testing of DeleteModal", () => {
  it("Should display when deletemodal is visible", () => {
    mockClient.setRequestHandler(DELETE_CONTACT_PHONE, () =>
      Promise.resolve({ data: [] })
    );
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <DeleteModal handleRefetch={jest.fn} />
      </ApolloProvider>,
      newInitialState
    );
    waitFor(() =>
      expect(screen.getByTestId("delete-modal-container")).toBeInTheDocument()
    );
  });
  it("Should not display when deletemodal is not visible", () => {
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <DeleteModal handleRefetch={jest.fn} />
      </ApolloProvider>,
      initialState
    );
    waitFor(() =>
      expect(screen.queryByTestId("delete-modal-container")).toBeNull()
    );
  });
  it("Should diplay title", () => {
    const newInitialState = {
      ...initialState,
      deleteModalVisible: true,
    };
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <DeleteModal handleRefetch={jest.fn} />
      </ApolloProvider>,
      newInitialState
    );
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
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <ApolloProvider client={mockClient}>
          <DeleteModal handleRefetch={jest.fn} />
        </ApolloProvider>
      </ApolloProvider>,
      newInitialState
    );
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
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <DeleteModal handleRefetch={jest.fn} />
      </ApolloProvider>,
      newInitialState
    );
    fireEvent.click(screen.getByTestId("handleDelete"));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
});
