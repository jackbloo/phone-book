import Avatar1 from "../assets/image/avatar-1.webp";
import Avatar2 from "../assets/image/avatar-2.webp";
import Avatar3 from "../assets/image/avatar-3.webp";
import Avatar4 from "../assets/image/avatar-4.webp";
import Avatar5 from "../assets/image/avatar-5.webp";
import Avatar6 from "../assets/image/avatar-6.webp";
import { RootDispatch } from "../store/store";
import {
  ContactListType,
  CreatePhoneResponseType,
  CreateResponseType,
  UpdateContactResponseType,
  UpdatePhoneResponseType,
} from "../interface/reducer";
import { GraphQLError } from "graphql";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ADD_NUMBER_TO_CONTACT,
  EDIT_PHONE_NUMBER,
} from "../apolloClient/queries";
import { toast } from "react-toastify";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const Dots = "...";

export const randomAvatar = () => {
  const options: { [key: number]: string } = {
    0: Avatar1,
    1: Avatar2,
    2: Avatar3,
    3: Avatar4,
    4: Avatar5,
    5: Avatar6,
  };
  const number = Math.floor(Math.random() * 5);
  return options[number];
};

export const checkIsError = (
  firstNameError: boolean,
  lastNameError: boolean,
  phoneNumbersError: boolean[],
  firstName: string,
  lastName: string,
  phoneNumbers: string[]
) => {
  return (
    firstNameError ||
    lastNameError ||
    phoneNumbersError.includes(true) ||
    firstName === "" ||
    lastName === "" ||
    phoneNumbers.includes("") ||
    !RegExp(/^[a-z ,.'-]+$/i).test(firstName) ||
    !RegExp(/^[a-z ,.'-]+$/i).test(lastName)
  );
};

export const handleCreateResult = (
  errors: readonly GraphQLError[] | undefined,
  data: CreateResponseType,
  createModal: boolean,
  offset: number,
  dispatch: RootDispatch,
  setAddContact: ActionCreatorWithPayload<
    ContactListType,
    "phonebook/setAddContact"
  >,
  setOffset: ActionCreatorWithPayload<number, "phonebook/setOffset">,
  refetch: ({ offset }: { offset: number }) => void,
  setCreateModal: ActionCreatorWithPayload<boolean, "phonebook/setCreateModal">,
  handleReset: () => void
) => {
  if (data) {
    if (data?.insert_contact) {
      if (data?.insert_contact?.returning?.length > 0) {
        if (createModal) {
          toast.success("Successfully add new contact");
          if (offset === 0) {
            dispatch(setAddContact(data?.insert_contact?.returning[0]));
          } else {
            dispatch(setOffset(0));
          }
          refetch({
            offset: 0,
          });
          dispatch(setCreateModal(false));
          handleReset();
          return;
        }
      }
    }
  }
  throw new Error("Failed to add new contact");
};

export const handleUpdateResult = (
  errors: readonly GraphQLError[] | undefined,
  data: CreatePhoneResponseType,
  editModal: boolean,
  dispatch: RootDispatch,
  setUpdateData: ActionCreatorWithPayload<
    ContactListType,
    "phonebook/setUpdateData"
  >,
  setEditModal: ActionCreatorWithPayload<boolean, "phonebook/setEditModal">,
  handleReset: () => void
) => {
  if (data) {
    if (data?.insert_phone) {
      if (data?.insert_phone?.returning?.length > 0) {
        if (editModal) {
          dispatch(setUpdateData(data?.insert_phone?.returning[0]?.contact));
          dispatch(setEditModal(false));
          handleReset();
          return;
        }
      }
    }
  }
  throw new Error("Failed to add new phone number");
};

export const handleUpdatePhoneResult = (
  errors: readonly GraphQLError[] | undefined,
  data: UpdatePhoneResponseType,
  editModal: boolean,
  dispatch: RootDispatch,
  setUpdateData: ActionCreatorWithPayload<
    ContactListType,
    "phonebook/setUpdateData"
  >,
  setEditModal: ActionCreatorWithPayload<boolean, "phonebook/setEditModal">,
  handleReset: () => void
) => {
  if (data) {
    if (data?.update_phone_by_pk) {
      if (data?.update_phone_by_pk?.contact) {
        if (editModal) {
          toast.success("Successfully update phone number of contact");
          dispatch(setUpdateData(data?.update_phone_by_pk?.contact));
          dispatch(setEditModal(false));
          handleReset();
          return;
        }
      }
    }
  }
  throw new Error("Failed to update new phone number");
};

export const handleUpdateContactResult = (
  errors: readonly GraphQLError[] | undefined,
  data: UpdateContactResponseType,
  editModal: boolean,
  dispatch: RootDispatch,
  setEditData: ActionCreatorWithPayload<
    ContactListType,
    "phonebook/setEditData"
  >,
  setEditModal: ActionCreatorWithPayload<boolean, "phonebook/setEditModal">,
  handleReset: () => void
) => {
  if (data) {
    if (data?.update_contact_by_pk) {
      if (data?.update_contact_by_pk) {
        if (editModal) {
          toast.success("Successfully update contact");
          dispatch(setEditData(data?.update_contact_by_pk));
          dispatch(setEditModal(false));
          handleReset();
          return;
        }
      }
    }
  }
  throw new Error("Failed to update contact");
};

export const checkAllErrors = (
  firstNameError: boolean,
  lastNameError: boolean,
  phoneNumbersError: boolean[],
  firstName: string,
  lastName: string,
  phoneNumbers: string[],
  setFirstNameError: (data: boolean) => void,
  setLastNameError: (data: boolean) => void,
  setPhoneNumbersError: (data: boolean[]) => void
) => {
  if (
    checkIsError(
      firstNameError,
      lastNameError,
      phoneNumbersError,
      firstName,
      lastName,
      phoneNumbers
    )
  ) {
    if (firstName === "" || !RegExp(/^[a-z ,.'-]+$/i).test(firstName)) {
      setFirstNameError(true);
      throw new Error("Please insert correct first name");
    } else if (lastName === "" || !RegExp(/^[a-z ,.'-]+$/i).test(lastName)) {
      setLastNameError(true);
      throw new Error("Please insert correct last name");
    } else if (phoneNumbers) {
      const copyPhoneNumbersError = [...phoneNumbersError];
      const newPhoneNumbersError = copyPhoneNumbersError.map((el, index) => {
        if (
          !RegExp(/^08[0-9]{9,}$/).test(phoneNumbers[index]) ||
          phoneNumbers[index] === ""
        ) {
          return true;
        } else {
          return false;
        }
      });
      if (newPhoneNumbersError.includes(true)) {
        setPhoneNumbersError(newPhoneNumbersError);
        throw new Error("Please insert correct phone number");
      }
    }
  }
};

export const handlePhoneUpdate = (
  phoneNumbers: string[],
  tempData: ContactListType,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  editModal: boolean,
  dispatch: RootDispatch,
  setUpdateData: ActionCreatorWithPayload<
    ContactListType,
    "phonebook/setUpdateData"
  >,
  setEditModal: ActionCreatorWithPayload<boolean, "phonebook/setEditModal">,
  handleReset: () => void
) => {
  if (phoneNumbers?.length !== tempData?.phones?.length) {
    phoneNumbers.forEach(async (el, index) => {
      if (!tempData.phones[index]) {
        const { data, errors } = await apolloClient.mutate({
          mutation: ADD_NUMBER_TO_CONTACT,
          variables: {
            contact_id: tempData?.id,
            phone_number: el,
          },
        });
        handleUpdateResult(
          errors,
          data,
          editModal,
          dispatch,
          setUpdateData,
          setEditModal,
          handleReset
        );
      } else {
        if (el !== tempData.phones[index].number) {
          const { data, errors } = await apolloClient.mutate({
            mutation: EDIT_PHONE_NUMBER,
            variables: {
              pk_columns: {
                number: tempData.phones[index].number,
                contact_id: tempData?.id,
              },
              new_phone_number: el,
            },
          });
          handleUpdatePhoneResult(
            errors,
            data,
            editModal,
            dispatch,
            setUpdateData,
            setEditModal,
            handleReset
          );
        }
      }
    });
  } else {
    phoneNumbers.forEach(async (el, index) => {
      if (el !== tempData.phones[index].number) {
        const { data, errors } = await apolloClient.mutate({
          mutation: EDIT_PHONE_NUMBER,
          variables: {
            pk_columns: {
              number: tempData.phones[index].number,
              contact_id: tempData?.id,
            },
            new_phone_number: el,
          },
        });
        handleUpdatePhoneResult(
          errors,
          data,
          editModal,
          dispatch,
          setUpdateData,
          setEditModal,
          handleReset
        );
      }
    });
  }
};

export const handleOnChangeProcess = (
  type: string,
  value: string,
  firstName: string,
  lastName: string,
  setFirstNameError: (data: boolean) => void,
  setFirstName: (data: string) => void,
  setLastNameError: (data: boolean) => void,
  setLastName: (data: string) => void,
  phoneNumbers: string[],
  phoneNumbersError: boolean[],
  setPhoneNumbersError: (data: boolean[]) => void,
  setPhoneNumbers: (data: string[]) => void,
  currentIndex?: number
) => {
  switch (type) {
    case "firstName":
      if (!RegExp(/^[a-z ,.'-]+$/i).test(firstName)) {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
      setFirstName(value);
      break;
    case "lastName":
      if (!RegExp(/^[a-z ,.'-]+$/i).test(lastName)) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
      setLastName(value);
      break;
    case "phoneNumber":
      {
        const copyPhoneNumbers = [...phoneNumbers];
        const newPhoneNumbers = copyPhoneNumbers.map((el, index) => {
          if (index === currentIndex) {
            return value;
          } else {
            return el;
          }
        });
        const copyPhoneNumbersError = [...phoneNumbersError];
        const newPhoneNumbersError = copyPhoneNumbersError.map((el, index) => {
          if (index === currentIndex) {
            if (!RegExp(/^08[0-9]{9,}$/).test(phoneNumbers[index])) {
              return true;
            } else {
              return false;
            }
          } else {
            return el;
          }
        });
        setPhoneNumbersError(newPhoneNumbersError);
        setPhoneNumbers(newPhoneNumbers);
      }
      break;
    default:
      return true;
  }
};
