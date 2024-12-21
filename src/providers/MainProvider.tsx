// src/providers/MainProvider.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
