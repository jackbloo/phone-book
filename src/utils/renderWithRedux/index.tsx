import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from "../../store/reducers";
import { InitialState } from "../../interface/reducer";

export const renderWithRedux = (
  children: React.ReactNode,
  initialState: InitialState
) => {
  const store = configureStore({
    reducer: phoneBookReducer,
    preloadedState: initialState,
  });
  return {
    ...render(<Provider store={store}>{children}</Provider>),
  };
};
