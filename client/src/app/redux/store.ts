"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import ChessReducer from "./slices/chessSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const chessPersistConfig = {
  key: "root",
  storage,
  whitelist: ["game", "fen"],
};

const makeStore = () => {
  return configureStore({
    reducer: {
      user: persistReducer(userPersistConfig, UserReducer),
      chess: persistReducer(chessPersistConfig, ChessReducer),
    },
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
