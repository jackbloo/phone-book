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
}

export interface LeftMenuProps {
  userName: string;
}
