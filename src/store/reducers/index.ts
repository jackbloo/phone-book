import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ContactListType, InitialState } from "../../interface/reducer";
import { randomAvatar } from "../../utils";

export const initialState: InitialState = {
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
    login: (state, { payload }: { payload: { userName: string } }) => {
      state.isLogin = true;
      state.userName = payload?.userName || "";
    },
    saveContactList: (
      state,
      { payload }: { payload: { contact: ContactListType[] } }
    ) => {
      state.contactList = [];
      if (payload?.contact) {
        state.tempContactList = [...payload.contact];
      }

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
    setSearchBar: (state, { payload }: PayloadAction<string>) => {
      state.contactList = [];
      state.offset = 0;
      state.noMoreData = false;
      state.search = payload;
    },
    setDeleteModal: (state, { payload }: PayloadAction<boolean>) => {
      state.deleteModalVisible = payload;
    },
    setDeleteId: (state, { payload }: PayloadAction<number>) => {
      state.deleteId = payload;
    },
    setDeleteData: (state, { payload }: PayloadAction<number>) => {
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
    setFavorite: (state, { payload }: PayloadAction<ContactListType>) => {
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
    setCreateModal: (state, { payload }: PayloadAction<boolean>) => {
      state.createModal = payload;
    },
    setAddContact: (state, { payload }: PayloadAction<ContactListType>) => {
      state.contactList?.pop();
      const newContactList = [
        { ...payload, image: randomAvatar() },
        ...state.contactList,
      ];
      state.contactList = [...newContactList];
    },
    setEditModal: (state, { payload }: PayloadAction<boolean>) => {
      state.editModal = payload;
    },
    setEditData: (state, { payload }: PayloadAction<ContactListType>) => {
      state.editData = payload;
    },
    setUpdateData: (state, { payload }: PayloadAction<ContactListType>) => {
      const copyContactList = [...state.contactList];
      const ids = new Set(copyContactList.map((el) => el.id));
      if (ids.has(payload?.id)) {
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
      } else {
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

        state.favoriteList = [...updateFavoriteList];
      }
    },
    setLogout: (state) => {
      state.contactList = [];
      state.noMoreData = false;
      state.isLogin = false;
      state.favoriteList = [];
    },
    setOffset: (state, { payload }: PayloadAction<number>) => {
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
