import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "..";
import * as reactRedux from "react-redux";
import { renderWithRedux } from "../../../utils/renderWithRedux";
import { initialState } from "../../../store/reducers";

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

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Unit testing of Modal", () => {
  it("Should display Edit Modal", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      editModal: true,
    });
    waitFor(() =>
      expect(screen.findByText("Edit Contact")).toBeInTheDocument()
    );
  });
  it("Should display create Modal", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    waitFor(() =>
      expect(screen.findByText("Create Contact")).toBeInTheDocument()
    );
  });
  it("Should not display any Modal", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, { ...initialState });
    waitFor(() => expect(screen.queryByText("First Name")).toBeNull());
  });
  it("Should trigger onchange of first name, last name, and phone number", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    fireEvent.change(screen.getByTestId("first-name-input-modal"), {
      target: { value: "test-firstname" },
    });
    fireEvent.change(screen.getByTestId("last-name-input-modal"), {
      target: { value: "test-lastname" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "0823131311" },
    });
    expect(screen.getByDisplayValue("test-firstname")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test-lastname")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0823131311")).toBeInTheDocument();
  });
  it("Should trigger submit with no error", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    fireEvent.change(screen.getByTestId("first-name-input-modal"), {
      target: { value: "test-firstname" },
    });
    fireEvent.change(screen.getByTestId("last-name-input-modal"), {
      target: { value: "test-lastname" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "0823131311" },
    });
    expect(screen.getByDisplayValue("test-firstname")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test-lastname")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0823131311")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("submit-contact"));
    expect(screen.queryByText("Please insert correct first name")).toBeNull();
  });
  it("Should trigger submit with last name and first name, and 1 phone number error", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    fireEvent.change(screen.getByTestId("first-name-input-modal"), {
      target: { value: "test-firstname!1414131" },
    });
    fireEvent.change(screen.getByTestId("last-name-input-modal"), {
      target: { value: "test-lastname!13131" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "2313131123" },
    });
    expect(
      screen.getByDisplayValue("test-firstname!1414131")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("test-lastname!13131")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2313131123")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("submit-contact"));
    expect(
      screen.getByText("Please insert correct First Name")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please insert correct Last Name")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please insert correct Number")
    ).toBeInTheDocument();
  });
  it("Should trigger cancel button", () => {
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
    mockUseDispatch.mockReturnValue(mockDispatch);
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    fireEvent.click(screen.getByTestId("cancel"));
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("Should trigger + phone number button", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      createModal: true,
    });
    fireEvent.click(screen.getByTestId("add-phone-number"));
    fireEvent.click(screen.getByTestId("add-phone-number"));
    expect(screen.getByText("Phone Number 2")).toBeInTheDocument();
    expect(screen.getByText("Phone Number 3")).toBeInTheDocument();
    expect(screen.getAllByText("Remove")).toHaveLength(2);
  });
  it("Should remove phone number button", () => {
    renderWithRedux(<Modal refetch={jest.fn} />, {
      ...initialState,
      editModal: true,
      editData: {
        created_at: "2023-11-13T12:20:05.966988+00:00",
        first_name: "Paris",
        id: 39052,
        last_name: "yusussu",
        image: "23131",
        phones: [
          {
            number: "828382828282882",
          },
        ],
      },
    });
    fireEvent.click(screen.getByTestId("add-phone-number"));
    fireEvent.click(screen.getByTestId("remove-1"));
    expect(screen.queryByText("Remove")).toBeNull();
    fireEvent.click(screen.getByTestId("cancel"));
  });
});
