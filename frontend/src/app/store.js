import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../features/AuthSlice";
import BooksSlice from "../features/BooksSlice";
const store = configureStore({
  reducer: { auth: AuthSliceReducer, books: BooksSlice },
});
export default store;
