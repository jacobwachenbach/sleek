// styles/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";
import baseTheme from "./theme";

// 🎨 Define your color palettes
const colorPalettes = {
  0: {
    background: "#282b30",
    text: "#7289da",
    primary: "#7289da",
    title: "#7289da",
  },
  1: {
    background: "#2d2d30",
    text: "#007acc",
    primary: "#007acc",
    title: "#007acc",
  },
  2: {
    background: "white",
    text: "black",
    primary: "black",
    title: "black",
  },
  3: {
    background: "black",
    text: "white",
    primary: "white",
    title: "white",
  },
};

// create context
export const ThemeContext = createContext();

// provider
export function ThemeProvider({ children }) {
  const [themePick, setThemePick] = useState(1); // start with 2nd palette
  const [theme, setTheme] = useState({ ...baseTheme, colors: colorPalettes[1] });

  // update theme when themePick changes
  useEffect(() => {
    if (colorPalettes[themePick]) {
      setTheme({ ...baseTheme, colors: colorPalettes[themePick] });
    }
  }, [themePick]);

  return (
    <ThemeContext.Provider value={{ theme, themePick, setThemePick }}>
      {children}
    </ThemeContext.Provider>
  );
}
