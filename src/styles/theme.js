// styles/theme.js
const baseTheme = {
  font: {
    family: {
      til: "'Titillium Web', sans-serif",   // ✅ now accessible as theme.font.family.til
      default: "sans-serif",                // optional fallback
    },
    weight: { normal: 400, bold: 600 },
    style: { italic: "italic", normal: "normal" },
    size: { small: "14px", smmall: "16px", medium: "18px", lmedium: "20px", large: "24px", title: "32px", xtitle: "50px" },
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
  },
};

export default baseTheme;
