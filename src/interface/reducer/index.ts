import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

export interface InitialState {
  isLogin: boolean;
  contactList: ContactListType[];
  limit: number;
  offset: number;
  noMoreData: boolean;
  userName: string;
  search: string;
  deleteModalVisible: boolean;
  deleteId: number;
  createModal: boolean;
  editModal: boolean;
  editData: ContactListType | null;
  favoriteList: ContactListType[];
  tempContactList: ContactListType[];
}
export interface ContactListType {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: PhoneType[];
  isFavorite?: boolean;
  image: string;
}

export interface PhoneType {
  number: string;
}

export interface ContactListComponentProps {
  contactList: ContactListType[];
  favoriteList: ContactListType[];
}

export interface LeftMenuProps {
  userName: string;
}

export interface DeleteModalProps {
  handleRefetch: () => void;
}

export type ReduxActionType = ThunkAction<
  unknown,
  { phoneBook: InitialState },
  undefined,
  AnyAction
>;

export interface CreateResponseType {
  insert_contact: { returning: ContactListType[] };
}
export interface CreatePhoneResponseType {
  insert_phone: { returning: { contact: ContactListType }[] };
}
export interface UpdatePhoneResponseType {
  update_phone_by_pk: { contact: ContactListType };
}
