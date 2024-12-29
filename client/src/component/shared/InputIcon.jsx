import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputIcon = ({ className, onClick, showPassword }) => {
  return (
    <i className={className} onClick={onClick}>
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </i>
  );
};

export default InputIcon;
