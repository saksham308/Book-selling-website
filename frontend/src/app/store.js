import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "../features/AuthSlice";
const store = configureStore({ reducer: { auth: AuthSliceReducer } });
export default store;
