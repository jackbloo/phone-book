import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../interface/reducer";

const initialState: InitialState = {
  isLogin: false,
};

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
  },
});
export const { login } = phonebookSlice.actions;

export default phonebookSlice.reducer;
