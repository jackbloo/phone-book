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
  favoriteList: [],
  tempContactList: [],
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
      state.contactList = [];
      state.tempContactList = [...payload?.contact];
      if (
        payload?.contact?.length === 0 ||
        payload?.contact?.length < state.limit
      ) {
        state.noMoreData = true;
      } else {
        state.noMoreData = false;
      }
      const ids = new Set(
        state.favoriteList?.map((el: ContactListType) => el.id)
      );
      const filtered = payload?.contact?.filter(
        (el: ContactListType) => !ids.has(el.id)
      );
      const copyContact = [...filtered];
      const newContactList = copyContact.map((el: ContactListType) => {
        return {
          ...el,
          image: randomAvatar(),
        };
      });
      state.contactList = newContactList;
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
      const copyFavoriteList = [...state.favoriteList];
      const filtered = copyContactList.filter((el) => el.id !== payload);
      const filteredFavorite = copyFavoriteList.filter(
        (el) => el.id !== payload
      );
      state.contactList = filtered;
      state.favoriteList = filteredFavorite;
      state.deleteId = 0;
    },
    setFavorite: (state, { payload }) => {
      const copyFavoriteList = [...state.favoriteList];
      const copyContactList = [...state.tempContactList];
      const filtered = copyFavoriteList.filter((el) => el.id !== payload.id);
      if (payload.isFavorite) {
        const ids = new Set([payload, ...copyFavoriteList].map((el) => el.id));
        const newFilteredContactList = copyContactList.filter(
          (el) => !ids.has(el.id)
        );
        const newContactList = newFilteredContactList.map(
          (el: ContactListType) => {
            return {
              ...el,
              image: randomAvatar(),
            };
          }
        );
        state.contactList = newContactList;
        state.favoriteList = [payload, ...filtered];
        state.limit = 10 + [payload, ...filtered].length;
      } else {
        const ids = new Set(filtered.map((el) => el.id));
        const newFilteredContactList = copyContactList.filter(
          (el) => !ids.has(el.id)
        );
        const newContactList = newFilteredContactList.map(
          (el: ContactListType) => {
            return {
              ...el,
              image: randomAvatar(),
            };
          }
        );
        state.favoriteList = [...filtered];
        state.contactList = [...newContactList];
        state.limit = 10 + filtered.length;
      }
    },
    setCreateModal: (state, { payload }) => {
      state.createModal = payload;
    },
    setAddContact: (state, { payload }) => {
      state.contactList?.pop();
      const newContactList = [
        { ...payload, image: randomAvatar() },
        ...state.contactList,
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
      const copyContactList = [...state.tempContactList];
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
      const copyFavoriteList = [...state.favoriteList];
      const updateFavoriteList = copyFavoriteList.map((el) => {
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
      state.favoriteList = [...updateFavoriteList];
    },
    setLogout: (state) => {
      state.contactList = [];
      state.noMoreData = false;
      state.isLogin = false;
      state.favoriteList = [];
    },
    setOffset: (state, { payload }) => {
      state.offset = payload;
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
  setOffset,
} = phonebookSlice.actions;

export default phonebookSlice.reducer;
