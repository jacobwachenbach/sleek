import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu";
import Random from "./components/Random";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import theme from "./styles/theme";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div style={{ fontFamily: theme.font.family, background: theme.colors.background, color: theme.colors.text, minHeight: "100vh" }}>
        {/* Sidebar */}
        <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div
          style={{
            marginLeft: isOpen ? "200px" : "60px",  // ✅ shifts content over
            transition: "margin-left 0.3s ease-in-out",
            padding: theme.spacing.large,
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
