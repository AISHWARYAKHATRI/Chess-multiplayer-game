"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
};
