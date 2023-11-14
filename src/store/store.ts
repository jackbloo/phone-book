import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import phoneBookReducer from "./reducers";
import thunk from "redux-thunk";

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

export const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("phonebookPersistanceState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  phoneBook: phoneBookReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([localStorageMiddleware, thunk]),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type RootDispatch = AppStore["dispatch"];
