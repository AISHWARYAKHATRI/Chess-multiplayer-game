"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import ChessReducer from "./slices/chessSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const chessPersistConfig = {
  key: "chess",
  storage,
  whitelist: [],
};

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistReducer(userPersistConfig, UserReducer),
      chess: persistReducer(chessPersistConfig, ChessReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
