import React from "react";

const select = () => {
  return (
    <select
      style={{ Width: "100%" }}
      className="form-select mb-3"
      aria-label="Large select example"
    >
      <option value="0">All rows</option>
      <option value="1">5</option>
      <option value="2">10</option>
      <option value="3">15</option>
    </select>
  );
};

export default select;
