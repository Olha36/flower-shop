"use client";

import {
  Input,
  inputClasses,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const blue = {
  200: "#b6daff",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  200: "#DAE2ED",
  300: "#C7D0DD",
  700: "#434D5B",
  900: "#1C2025",
};



export const StyledInput = styled(Input)(({ theme }) => ({
  [`& .${inputClasses.input}`]: {
    width: 320,
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: 8,
    color: theme.palette.mode === "dark" ? grey[300] : grey[900],
    backgroundColor: theme.palette.mode === "dark" ? grey[900] : "#fff",
    border: `1px solid ${
      theme.palette.mode === "dark" ? grey[700] : grey[200]
    }`,
    boxShadow: `0 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    }`,
    transition: "0.2s",

    "&:hover": {
      borderColor: blue[400],
    },

    "&:focus": {
      outline: 0,
      borderColor: blue[400],
      boxShadow: `0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      }`,
    },
  },
}));

export default function CustomInputExample() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isError = touched && value.trim() === "";

  return (
    <FormControl error={isError} required variant="standard">
      <InputLabel shrink>Label</InputLabel>

      <StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        disableUnderline
      />

      {isError && <FormHelperText>This field is required.</FormHelperText>}
    </FormControl>
  );
}


