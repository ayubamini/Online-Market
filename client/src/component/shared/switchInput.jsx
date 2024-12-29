import React from "react";

const SwitchInput = ({
  name,
  label,
  error,
  checked,
  isDisable,
  onChange,
}) => {
  return (
    <div className="form-group">
      <div className="form-check form-switch">
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
        <input
          name={name}
          class="form-check-input"
          type="checkbox"
          role="switch"
          id={name}
          disabled={isDisable ? "disabled" : ""}
          checked={checked ? "checked" : ""}
          onChange={onChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SwitchInput;
