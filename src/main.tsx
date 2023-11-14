import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { loadFromLocalStorage, setupStore } from "./store/store";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={setupStore(loadFromLocalStorage())}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
