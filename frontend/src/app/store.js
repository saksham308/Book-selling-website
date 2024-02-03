import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../features/AuthSlice";
import BooksSlice from "../features/BooksSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({ auth: AuthSliceReducer, books: BooksSlice });
const PersistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: PersistedReducer,
});
export default store;
