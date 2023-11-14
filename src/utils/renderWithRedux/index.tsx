import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import phoneBookReducer, { initialState } from "../../store/reducers";
import { InitialState } from "../../interface/reducer";

// interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: AppStore;
// }

export function renderWithRedux(ui: React.ReactElement, state: InitialState) {
  const store = configureStore({
    reducer: { phoneBook: phoneBookReducer },
    preloadedState: { phoneBook: state },
  });
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
