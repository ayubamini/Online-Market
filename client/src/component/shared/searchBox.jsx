import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      className="form-control"
      placeholder="Type to search..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
