import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "..";
import * as reactRedux from "react-redux";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";
import { createMockClient } from "mock-apollo-client";
import { ApolloProvider } from "@apollo/client";
import { GET_CONTACT_LIST } from "../../../apolloClient/queries";
import { mockData } from "../mockData";

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

jest.mock("../../../utils/url", () => ({
  __esModule: true,
  getAPIUrl: jest.fn(() => "hi"),
}));
jest.mock("lodash.debounce", () => {
  return {
    __esModule: true,
    ...jest.requireActual("lodash.debounce"),
    default: () => jest.fn(),
  };
});

const mockClient = createMockClient();
const mockClientWithData = createMockClient();
const mockClientError = createMockClient();

describe("Unit testing of Home", () => {
  it("Should display Home with no data", () => {
    mockClient.setRequestHandler(GET_CONTACT_LIST, () =>
      Promise.resolve({ data: { contact: [] } })
    );
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <Home />
      </ApolloProvider>,
      { ...initialState, search: "23242" }
    );
    waitFor(() => expect(screen.findByText("Hi, test")).toBeInTheDocument());
    waitFor(() =>
      expect(screen.findByText("No Data Found")).toBeInTheDocument()
    );
  });
  it("Should trigger handle setCreateModal", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ApolloProvider client={mockClient}>
        <Home />
      </ApolloProvider>,
      { ...initialState, search: "" }
    );
    fireEvent.click(screen.getByTestId("click-create-modal"));
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("Should trigger handle previous button", () => {
    mockClientWithData.setRequestHandler(GET_CONTACT_LIST, () =>
      Promise.resolve({ data: { contact: [...mockData] } })
    );
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ApolloProvider client={mockClientWithData}>
        <Home />
      </ApolloProvider>,
      {
        ...initialState,
        search: "",
        offset: 20,
        limit: 5,
        tempContactList: [...mockData],
        contactList: [...mockData],
        noMoreData: false,
      }
    );
    waitFor(() => fireEvent.click(screen.getByTestId("previous")));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should trigger handle next button", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(
      <ApolloProvider client={mockClientWithData}>
        <Home />
      </ApolloProvider>,
      {
        ...initialState,
        search: "",
        offset: 10,
        limit: 5,
        tempContactList: [...mockData],
        contactList: [...mockData],
        noMoreData: false,
      }
    );
    waitFor(() => fireEvent.click(screen.getByTestId("next")));
    waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  it("Should display error message", () => {
    mockClientError.setRequestHandler(GET_CONTACT_LIST, () =>
      Promise.reject(true)
    );
    renderWithRedux(
      <ApolloProvider client={mockClientError}>
        <Home />
      </ApolloProvider>,
      {
        ...initialState,
      }
    );
    waitFor(() =>
      expect(
        screen.getByText("Oops! Something went wrong!")
      ).toBeInTheDocument()
    );
  });
});
