import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import Account from "./pages/Account.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import Uploads from "./pages/Uploads.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/user-uploads" element={<Uploads />} />
      <Route path="/upload" element={<UploadPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider resetCSS={true}>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
