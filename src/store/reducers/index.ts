import { createSlice } from "@reduxjs/toolkit";
import { ContactListType, InitialState } from "../../interface/reducer";
import { randomAvatar } from "../../utils";

const initialState: InitialState = {
  isLogin: false,
  limit: 10,
  offset: 0,
  userName: "",
  contactList: [],
  noMoreData: false,
  search: "",
  deleteModalVisible: false,
  deleteId: 0,
  createModal: false,
  editModal: false,
  editData: null,
};

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLogin = true;
      state.userName = payload?.userName || "";
    },
    saveContactList: (state, { payload }) => {
      if (
        payload?.contact?.length === 0 ||
        payload?.contact?.length < state.limit
      ) {
        state.noMoreData = true;
      }
      const copyContact = [...payload?.contact];
      const newContactList = copyContact.map((el: ContactListType) => {
        return {
          ...el,
          image: randomAvatar(),
        };
      });
      const ids = new Set(state.contactList.map((d) => d.id));
      const mergedList = [
        ...state.contactList,
        ...newContactList.filter((d) => !ids.has(d.id)),
      ];
      state.contactList = mergedList;
    },
    setSearchBar: (state, { payload }) => {
      state.contactList = [];
      state.offset = 0;
      state.noMoreData = false;
      state.search = payload;
    },
    setDeleteModal: (state, { payload }) => {
      state.deleteModalVisible = payload;
    },
    setDeleteId: (state, { payload }) => {
      state.deleteId = payload;
    },
    setDeleteData: (state, { payload }) => {
      const copyContactList = [...state.contactList];
      const filtered = copyContactList.filter((el) => el.id !== payload);
      state.contactList = filtered;
      state.deleteId = 0;
    },
    setFavorite: (state, { payload }) => {
      const copyContactList = [...state.contactList];
      const filtered = copyContactList.filter((el) => el.id !== payload.id);
      if (payload.isFavorite) {
        state.contactList = [payload, ...filtered];
      } else {
        state.contactList = [...filtered, payload];
      }
    },
    setCreateModal: (state, { payload }) => {
      state.createModal = payload;
    },
    setAddContact: (state, { payload }) => {
      const newContactList = [
        ...state.contactList,
        { ...payload, image: randomAvatar() },
      ];
      state.contactList = [...newContactList];
    },
    setEditModal: (state, { payload }) => {
      state.editModal = payload;
    },
    setEditData: (state, { payload }) => {
      state.editData = payload;
    },
    setUpdateData: (state, { payload }) => {
      const copyContactList = [...state.contactList];
      const updateContactList = copyContactList.map((el) => {
        if (el.id === payload?.id) {
          return {
            ...el,
            first_name: payload?.first_name,
            last_name: payload?.last_name,
            phones: payload?.phones,
          };
        } else {
          return el;
        }
      });
      state.contactList = [...updateContactList];
    },
    setLogout: (state) => {
      state.contactList = [];
      state.noMoreData = false;
      state.isLogin = false;
    },
  },
});
export const {
  login,
  saveContactList,
  setSearchBar,
  setDeleteModal,
  setDeleteData,
  setDeleteId,
  setFavorite,
  setCreateModal,
  setAddContact,
  setEditModal,
  setEditData,
  setUpdateData,
  setLogout,
} = phonebookSlice.actions;

export default phonebookSlice.reducer;
