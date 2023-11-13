import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setDeleteData,
  setDeleteModal,
  setDeleteId,
} from "../../store/reducers";
import {
  ActionContainer,
  ModalContainer,
  ModalContent,
  TextAction,
  TextNo,
  Title,
} from "./styled.components";
import apolloClient from "../../apolloClient";
import { DELETE_CONTACT_PHONE } from "../../apolloClient/queries";
import { DeleteModalProps } from "../../interface/reducer";

const DeleteModal = ({ handleRefetch }: DeleteModalProps) => {
  const dispatch = useDispatch();
  const { deleteModalVisible, deleteId } = useSelector(
    (state: RootState) => state.phoneBook
  );
  const onClose = () => {
    dispatch(setDeleteModal(false));
    dispatch(setDeleteId(0));
  };

  const handleDelete = async () => {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_CONTACT_PHONE,
      variables: {
        id: deleteId,
      },
    });
    if (data) {
      handleRefetch();
      dispatch(setDeleteData(deleteId));
      dispatch(setDeleteModal(false));
    }
  };

  return (
    <>
      {deleteModalVisible &&
        createPortal(
          <ModalContainer>
            <ModalContent>
              <Title>Do you want to delete this contact?</Title>
              <ActionContainer>
                <TextNo onClick={handleDelete}>Yes</TextNo>
                <TextAction onClick={onClose}>No</TextAction>
              </ActionContainer>
            </ModalContent>
          </ModalContainer>,
          document.body
        )}
    </>
  );
};

export default DeleteModal;
