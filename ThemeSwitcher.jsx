// src/components/ThemeSwitcher.jsx
import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeSwitcher({ mode, onToggle }) {
  return (
    <FormControlLabel
      control={<Switch checked={mode === "dark"} onChange={onToggle} />}
      label={mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      sx={{ ml: 1 }}
    />
  );
}
