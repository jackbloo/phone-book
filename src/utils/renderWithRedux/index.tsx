import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import phoneBookReducer from "../../store/reducers";
import { InitialState } from "../../interface/reducer";

export function renderWithRedux(ui: React.ReactElement, state: InitialState) {
  const store = configureStore({
    reducer: { phoneBook: phoneBookReducer },
    preloadedState: { phoneBook: state },
  });
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
