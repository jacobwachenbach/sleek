import React, { useContext } from "react";
import "@fontsource/titillium-web/400-italic.css";
import { ThemeContext } from "../styles/ThemeContext";
import Dial from "../components/Dial";
import ThemeButton from "../components/ThemeButton";

export default function Settings() {
  const { theme, themePick, setThemePick } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h1 style={styles(theme).settingsTitle}>Sleek Theme Settings</h1>
      <h1 style={styles(theme).settingsHeader}>Color Palettes</h1>

      <div style={styles(theme).settingsContainer}>
        <ThemeButton
          numCircles={3}
          circleColors={["#7289da", "#424549", "#282b30"]}
          isActive={themePick === 0}
          onClick={() => setThemePick(0)}
        />
        <ThemeButton
          numCircles={5}
          circleColors={["#007acc", "#3e3e42", "#2d2d30", "#252526", "#1e1e1e"]}
          isActive={themePick === 1}
          onClick={() => setThemePick(1)}
        />
        <ThemeButton
          numCircles={2}
          circleColors={["white", "black"]}
          isActive={themePick === 2}
          onClick={() => setThemePick(2)}
        />
        <ThemeButton
          numCircles={2}
          circleColors={["black", "white"]}
          isActive={themePick === 3}
          onClick={() => setThemePick(3)}
        />
      </div>

      <div style={styles(theme).settingsContainer}>
        <h1 style={styles(theme).settingsText}>Title Font Size:</h1>
        <Dial />
      </div>
    </div>
  );
}

const styles = (theme) => ({
  settingsTitle: {
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight.normal,
    fontStyle: theme.font.style.italic,
    fontSize: theme.font.size.title,
    color: theme.colors.title,
  },
  settingsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
  },
  settingsHeader: {
    paddingRight: "12px",
    fontSize: theme.font.size.large,
    color: theme.colors.primary,
  },
  settingsText: {
    paddingRight: "12px",
    fontSize: theme.font.size.medium,
  },
});
