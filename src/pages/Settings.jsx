import React from "react";
// index.js or App.js
import "@fontsource/titillium-web/400-italic.css";
import theme from "../styles/theme";
import Dial from "../components/Dial";


export default function Settings() {
  return (
    <>
    <h1 style={styles.settingsTitle}>Sleek Theme Settings</h1>

    <div style={styles.settingsContainer}>
      <h1 style={styles.settingsText}>Title Font Size:  </h1>
      <Dial />
    </div>
  
    </>




    

  )
  
}
/** @type {{ [key: string]: import('react').CSSProperties }} */
const styles = {
    settingsTitle: {
      fontFamily: theme.font.family,
      fontFamily: theme.font.family,
      fontWeight: theme.font.weight.normal,
      fontStyle: theme.font.style.italic,
      fontSize: theme.font.size.xlarge,
    },
    settingsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingsText: {
      paddingRight: "12px",
      fontSize: theme.font.size.medium,
    }
  }