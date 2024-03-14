import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

// This will init firebase
import "./config/firebase-config.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
