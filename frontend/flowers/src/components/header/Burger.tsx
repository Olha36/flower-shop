"use client";

import { Box } from "@mui/material";

type BurgerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Burger({ open, setOpen }: BurgerProps) {
  const lineColor = open ? "#fff" : "#000";

  return (
    <Box
      component="button"
      onClick={() => setOpen(!open)}
      aria-label="Toggle menu"
      sx={{
        position: "absolute",
        top: "5%",
        right: "32px",
        width: "32px",
        height: "32px",
        zIndex: 110,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: { xs: "block", sm: "none" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "32px",
          height: "3px",
          backgroundColor: lineColor,
          borderRadius: "4px",
          transition: "all 0.3s",
          transformOrigin: "1px",
          top: open ? "-6px" : "0px",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "32px",
          height: "3px",
          backgroundColor: lineColor,
          borderRadius: "4px",
          top: "50%",
          transform: open
            ? "translateY(-50%) translateX(20px)"
            : "translateY(-50%)",
          opacity: open ? 0 : 1,
          transition: "all 0.3s",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "32px",
          height: "3px",
          backgroundColor: lineColor,
          borderRadius: "4px",
          transition: "all 0.3s",
          transformOrigin: "1px",
          top: open ? "50%" : "auto",
          bottom: open ? "auto" : "0px",
          transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        }}
      />
    </Box>
  );
}
