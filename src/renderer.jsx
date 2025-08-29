import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';   // ✅ Import App.jsx
import "@fontsource/titillium-web/400.css";        // normal
import "@fontsource/titillium-web/400-italic.css"; // italic


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
