import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./config/radar.js";

// This will init firebase
import "./config/firebase-config.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);