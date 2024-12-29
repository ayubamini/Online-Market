import React, { useEffect, useState } from "react";
import Input from "./input";
import SelectStateDropDown from "./selectStateDropDown";

const AddressInput = ({ value = {}, onAddressChange }) => {
  const { addressLine = "", state = "", city = "", zipcode = "" } = value;
  const handleChange = (e) => {
    onAddressChange({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <form className="row g-3">
      <div className="col-12">
        <Input
          name="addressLine"
          type="text"
          label="Address Line"
          value={value.addressLine}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <Input
          name="city"
          type="text"
          label="City"
          value={value.city}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <SelectStateDropDown
          name="state"
          label="State"
          value={value.state}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <Input
          name="zip"
          type="text"
          label="Zip"
          value={value.zip}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default AddressInput;
