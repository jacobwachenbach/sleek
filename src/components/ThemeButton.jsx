import React, { useState } from "react";

const ThemeButton = ({ numCircles = 3, circleColors = [], isActive, onClick}) => {
  const [containerHovered, setContainerHovered] = useState(false);

  // circle + margins
  const circleSize = 16;  // px
  const circleMargin = 4; // px
  const basePadding = 10; // px container padding

  // compute natural width/height
  const baseWidth = numCircles * (circleSize + circleMargin * 2) + basePadding;
  const baseHeight = circleSize + circleMargin * 2 + basePadding;

  // expand both width & height when hovered
  const width = containerHovered ? baseWidth + 4 : baseWidth;
  const height = containerHovered ? baseHeight + 4 : baseHeight;

  return (
    <div
        onClick={onClick}
        style={{
            ...Styles.Container,
            width,
            height,
            transition: "width 0.3s, height 0.3s",
            borderColor: isActive ? "blue" : "black", // active vs inactive
        }}
        onMouseEnter={() => setContainerHovered(true)}
        onMouseLeave={() => setContainerHovered(false)}
    >
      {Array.from({ length: numCircles }).map((_, idx) => (
        <div
          key={idx}
          style={{
            ...Styles.StyleCircle,
            width: circleSize,
            height: circleSize,
            backgroundColor: circleColors[idx] || "#fff",
          }}
        />
      ))}
    </div>
  );
};

/** @type {{ [key: string]: import('react').CSSProperties }} */
const Styles = {
  Container: {
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 1,
  },
  StyleCircle: {
    margin: 4,
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
};

export default ThemeButton;
