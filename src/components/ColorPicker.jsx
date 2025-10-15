import React from "react";

const ColorPicker = ({ color, onChange, label }) => {
  return (
    <div className="flex items-center space-x-3">
      {label ? (
        <span className="text-sm text-gray-300 whitespace-nowrap">{label}</span>
      ) : null}
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-12 h-12 rounded-md border border-white/20 bg-transparent p-0 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label={label || "Pick color"}
      />
      <div
        className="w-8 h-8 rounded-md border border-white/20"
        style={{ backgroundColor: color }}
        aria-hidden
      />
    </div>
  );
};

export default ColorPicker;
