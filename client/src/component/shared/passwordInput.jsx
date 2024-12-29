import React from "react";
import InputIcon from "./InputIcon";

const PasswordInput = ({
  name,
  type,
  value,
  label,
  placeholder,
  onChange,
  iconClassName,
  showPassword,
  passwordIconOnClick,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        autocomplete="off"
      />
      {/* <InputIcon
        className={iconClassName}
        onClick={passwordIconOnClick}
        showPassword={showPassword}
      /> */}
    </div>
  );
};

export default PasswordInput;
