import React from "react";
import { TextField } from "@mui/material";

const ColorPicker = ({ color, onChange }) => {
  return (
    <TextField
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      sx={{ width: 60, height: 60, padding: 0, borderRadius: 1 }}
    />
  );
};

export default ColorPicker;
