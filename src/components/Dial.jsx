import React, { useState, useRef, useEffect } from "react";

const Dial = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const optionRefs = useRef({});

  const max = 20;
  const options = Array.from({ length: max + 1 }, (_, i) => max - i); // reversed → max → 0

  const increment = () => setValue((v) => Math.min(v + 1, max));
  const decrement = () => setValue((v) => Math.max(v - 1, 0));

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Jump to selected number (no scrolling effect)
  useEffect(() => {
    if (open && optionRefs.current[value]) {
      optionRefs.current[value].scrollIntoView({
        block: "center",
        behavior: "auto", // instant, no smooth scroll
      });
    }
  }, [open, value]);

  return (
    <div style={{ position: "relative", display: "inline-block", textAlign: "center" }}>
      {/* Up Arrow */}
      <div
        onClick={increment}
        style={{ cursor: "pointer", userSelect: "none", color: "#4cafef" }}
      >
        ^
      </div>

      {/* Number (click to open menu) */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "8px 12px",
          border: "1px solid #4cafef",
          borderRadius: "6px",
          cursor: "pointer",
          userSelect: "none",
          background: "#575757",
          color: "#fff",
          margin: "4px 0",
        }}
      >
        {value}
      </div>

      {/* Down Arrow */}
      <div
        onClick={decrement}
        style={{ cursor: "pointer", userSelect: "none", color: "#4cafef" }}
      >
        v
      </div>

      {/* Popup menu aligned right, numbers reversed */}
      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "0",
            left: "110%",
            maxHeight: "150px",
            width: "80px",
            overflowY: "auto",
            border: "1px solid #4cafef",
            background: "#333",
            borderRadius: "6px",
            zIndex: 10,
          }}
        >
          {options.map((n) => (
            <div
              key={n}
              ref={(el) => (optionRefs.current[n] = el)}
              onClick={() => {
                setValue(n);
                setOpen(false);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: n === value ? "#4cafef" : "transparent",
                color: "#fff",
              }}
            >
              {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dial;
