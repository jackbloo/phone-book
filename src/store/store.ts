import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from "./reducers";

const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    try {
      const result = next(action);
      const serialisedState = JSON.stringify(getState());
      localStorage.setItem("phonebookPersistanceState", serialisedState);
      return result;
    } catch (e) {
      console.warn(e);
    }
  };
};

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("phonebookPersistanceState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
