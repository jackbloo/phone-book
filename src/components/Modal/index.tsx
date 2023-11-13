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
  ADD_NUMBER_TO_CONTACT,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
  GET_CONTACT_LIST,
} from "../../apolloClient/queries";
import { ContactListType } from "../../interface/reducer";

const Modal = () => {
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
    });
  };

  const handleOnChange = (
    type: string,
    value: string,
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
            if (!RegExp(/^\+?\d{12}(\d{2})?$/).test(phoneNumbers[index])) {
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
        break;
      default:
        return true;
    }
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
    if (
      firstNameError ||
      lastNameError ||
      phoneNumbersError.includes(true) ||
      firstName === "" ||
      lastName === "" ||
      phoneNumbers.includes("") ||
      !RegExp(/^[a-z ,.'-]+$/i).test(firstName) ||
      !RegExp(/^[a-z ,.'-]+$/i).test(lastName)
    ) {
      if (firstName === "" || !RegExp(/^[a-z ,.'-]+$/i).test(firstName)) {
        setFirstNameError(true);
      } else if (lastName === "" || !RegExp(/^[a-z ,.'-]+$/i).test(lastName)) {
        setLastNameError(true);
      } else if (phoneNumbers.includes("")) {
        const copyPhoneNumbersError = [...phoneNumbersError];
        const newPhoneNumbersError = copyPhoneNumbersError.map((el, index) => {
          if (!RegExp(/^\+?\d{12}(\d{2})?$/).test(phoneNumbers[index])) {
            return true;
          } else {
            return false;
          }
        });
        setPhoneNumbersError(newPhoneNumbersError);
      }
      return;
    }
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
          if (errors) {
          } else if (data) {
            if (data?.insert_contact) {
              if (data?.insert_contact?.returning?.length > 0) {
                if (createModal) {
                  if (offset === 0) {
                    dispatch(setAddContact(data?.insert_contact?.returning[0]));
                  } else {
                    dispatch(setOffset(0));
                  }

                  dispatch(setCreateModal(false));
                  handleReset();
                }
              }
            }
          }
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
            if (errors) {
            } else if (data) {
              if (data?.insert_phone) {
                if (data?.insert_phone?.returning?.length > 0) {
                  if (editModal) {
                    dispatch(
                      setUpdateData(data?.insert_phone?.returning[0]?.contact)
                    );
                    dispatch(setEditModal(false));
                    handleReset();
                  }
                }
              }
            }
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
              if (errors) {
              } else if (data) {
                if (data?.update_phone_by_pk) {
                  if (data?.update_phone_by_pk?.contact) {
                    if (editModal) {
                      dispatch(
                        setUpdateData(data?.update_phone_by_pk?.contact)
                      );
                      dispatch(setEditModal(false));
                      handleReset();
                    }
                  }
                }
              }
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
            if (errors) {
            } else if (data) {
              if (data?.update_phone_by_pk) {
                if (data?.update_phone_by_pk?.contact) {
                  if (editModal) {
                    dispatch(setUpdateData(data?.update_phone_by_pk?.contact));
                    dispatch(setEditModal(false));
                    handleReset();
                  }
                }
              }
            }
          }
        });
      }

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
      if (errors) {
      } else if (data) {
        if (data?.insert_contact) {
          if (data?.insert_contact?.returning?.length > 0) {
            if (editModal) {
              dispatch(setEditData(data?.insert_contact?.returning[0]));
              dispatch(setEditModal(false));
              handleReset();
            }
          }
        }
      }
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
