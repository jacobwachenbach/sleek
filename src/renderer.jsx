import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";   // ✅ Import App.jsx
import "@fontsource/titillium-web/400.css";
import "@fontsource/titillium-web/400-italic.css";

import { ThemeProvider } from "./styles/ThemeContext"; // ✅ Correct import

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
