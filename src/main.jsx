import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home.jsx";
import "./index.css";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
    <ToastContainer />
  </StrictMode>
);
