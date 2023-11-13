import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setCreateModal,
  setEditData,
  setEditModal,
  setUpdateData,
  setOffset,
  setAddContact,
} from "../../store/reducers";
import {
  ActionContainer,
  BodyContent,
  ErrorLabel,
  ExtraButton,
  Input,
  Label,
  ModalContainer,
  ModalContent,
  PhoneNumberContainer,
  RemovePhoneNumber,
  TextAction,
  TextNo,
  Title,
  TopContent,
} from "./styled.components";
import apolloClient from "../../apolloClient";
import {
  ADD_CONTACT_WITH_PHONES,
  EDIT_CONTACT,
  GET_CONTACT_LIST,
} from "../../apolloClient/queries";
import { ContactListType } from "../../interface/reducer";
import {
  checkAllErrors,
  handleCreateResult,
  handleOnChangeProcess,
  handlePhoneUpdate,
  handleUpdateContactResult,
} from "../../utils";

const Modal = ({ refetch }: any) => {
  const dispatch = useDispatch();
  const { createModal, editData, editModal, offset } = useSelector(
    (state: RootState) => state.phoneBook
  );
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [phoneNumbersError, setPhoneNumbersError] = useState([false]);
  const [firstNameError, setFirstNameError] = useState(false);
  const [duplicateNameError, setDuplicateNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempData, setTempData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    phones: [
      {
        number: "",
      },
    ],
    created_at: "",
  });
  const onClose = () => {
    if (createModal) {
      dispatch(setCreateModal(false));
    } else {
      dispatch(setEditModal(false));
    }
    handleReset();
  };

  const AddPhoneNumber = () => {
    const copyPhoneNumbers = [...phoneNumbers];
    copyPhoneNumbers.push("");
    const copyPhoneNumbersError = [...phoneNumbersError];
    copyPhoneNumbersError.push(false);
    setPhoneNumbers(copyPhoneNumbers);
    setPhoneNumbersError(copyPhoneNumbersError);
  };

  const removePhoneNumber = (currentIndex: number) => {
    const copyPhoneNumbers = [...phoneNumbers];
    const filtered = copyPhoneNumbers.filter(
      (el, index) => index !== currentIndex
    );
    setPhoneNumbers(filtered);
  };

  const handleReset = () => {
    setDuplicateNameError(false);
    setFirstName("");
    setLastName("");
    setPhoneNumbers([""]);
    setTempData({
      id: 0,
      first_name: "",
      last_name: "",
      phones: [
        {
          number: "",
        },
      ],
      created_at: "",
    });
  };

  const handleOnChange = (
    type: string,
    value: string,
    currentIndex?: number
  ) => {
    handleOnChangeProcess(
      type,
      value,
      firstName,
      lastName,
      setFirstNameError,
      setFirstName,
      setLastNameError,
      setLastName,
      phoneNumbers,
      phoneNumbersError,
      setPhoneNumbersError,
      setPhoneNumbers,
      currentIndex
    );
  };

  useEffect(() => {
    if (editModal && editData) {
      setTempData(editData);
      setFirstName(editData?.first_name);
      setLastName(editData?.last_name);
      const tempPhones = editData?.phones?.map((el) => {
        return el.number;
      });
      setPhoneNumbers(tempPhones);
    }
  }, [editModal]);

  const handleCreate = async () => {
    checkAllErrors(
      firstNameError,
      lastNameError,
      phoneNumbersError,
      firstName,
      lastName,
      phoneNumbers,
      setFirstNameError,
      setLastNameError,
      setPhoneNumbersError
    );
    const newPhone = phoneNumbers.map((el) => {
      return {
        number: el,
      };
    });

    if (createModal) {
      const { data: allData, errors: getError } = await apolloClient.query({
        query: GET_CONTACT_LIST,
      });
      if (getError) {
      } else if (allData) {
        const allNames = new Set(
          allData?.contact?.map((el: ContactListType) =>
            el.first_name.toLocaleLowerCase()
          )
        );
        if (allNames.has(firstName)) {
          setDuplicateNameError(true);
        } else {
          const { data, errors } = await apolloClient.mutate({
            mutation: ADD_CONTACT_WITH_PHONES,
            variables: {
              first_name: firstName,
              last_name: lastName,
              phones: newPhone,
            },
          });
          handleCreateResult(
            errors,
            data,
            createModal,
            offset,
            dispatch,
            setAddContact,
            setOffset,
            refetch,
            setCreateModal,
            handleReset
          );
        }
      }
    } else {
      let flag = false;
      let options: {
        [key: string]: string | number | any;
      } = {
        id: tempData?.id,
        _set: {},
      };
      if (firstName !== tempData?.first_name) {
        options._set.first_name = firstName;
        flag = true;
      }
      if (lastName !== tempData?.last_name) {
        options["last_name"] = firstName;
        flag = true;
      }
      handlePhoneUpdate(
        phoneNumbers,
        tempData as ContactListType,
        apolloClient,
        editModal,
        dispatch,
        setUpdateData,
        setEditModal,
        handleReset
      );

      if (!flag) {
        dispatch(setEditModal(false));
        handleReset();
        return;
      }
      const { data, errors } = await apolloClient.mutate({
        mutation: EDIT_CONTACT,
        variables: {
          ...options,
        },
      });
      handleUpdateContactResult(
        errors,
        data,
        editModal,
        dispatch,
        setEditData,
        setEditModal,
        handleReset
      );
    }
  };
  const showModal: boolean = createModal || editModal;
  return (
    <>
      {showModal &&
        createPortal(
          <ModalContainer>
            <ModalContent>
              <TopContent>
                <Title>{createModal ? "Create Contact" : "Edit Contact"}</Title>
                <BodyContent>
                  <Label>First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) =>
                      handleOnChange("firstName", e.target.value)
                    }
                  />
                  {firstNameError ||
                    (duplicateNameError && (
                      <ErrorLabel>
                        {firstNameError
                          ? "Please insert correct first name"
                          : "The name is existed, Please choose another name"}
                      </ErrorLabel>
                    ))}

                  <Label>Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => handleOnChange("lastName", e.target.value)}
                  />
                  {lastNameError && (
                    <ErrorLabel>Please insert correct Last Name</ErrorLabel>
                  )}
                  {phoneNumbers.map((el, index) => (
                    <PhoneNumberContainer key={index}>
                      <Label>
                        Phone Number {index + 1}{" "}
                        {index !== 0 && (
                          <RemovePhoneNumber
                            onClick={(e) => removePhoneNumber(index)}
                          >
                            Remove
                          </RemovePhoneNumber>
                        )}{" "}
                      </Label>
                      <Input
                        value={el}
                        onChange={(e) =>
                          handleOnChange("phoneNumber", e.target.value, index)
                        }
                      />
                      {phoneNumbersError[index] && (
                        <ErrorLabel>Please insert correct Number</ErrorLabel>
                      )}
                    </PhoneNumberContainer>
                  ))}
                  {phoneNumbers.length < 3 && (
                    <ExtraButton onClick={AddPhoneNumber}>
                      + Add more Phone Number
                    </ExtraButton>
                  )}
                </BodyContent>
              </TopContent>

              <ActionContainer>
                <TextNo onClick={handleCreate}>Submit</TextNo>
                <TextAction onClick={onClose}>Cancel</TextAction>
              </ActionContainer>
            </ModalContent>
          </ModalContainer>,
          document.body
        )}
    </>
  );
};

export default Modal;
