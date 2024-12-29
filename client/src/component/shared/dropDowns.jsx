import React from "react";

const DropDowns = (props) => {
  const { items, selectedItem, value, textDataProperty, valueDataProperty, onItemSelect } = props;

  return (
    <div class="btn-group">
      <button
        type="button"
        className="btn btn-success dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value}
      </button>
      <ul className="dropdown-menu">
        {items.map((item) => (
          <li
            key={item[valueDataProperty]}
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "dropdown-item active"
                : "dropdown-item"
            }
          >
            {item[textDataProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDowns.defaultProps = {
  textDataProperty: "name",
  valueDataProperty: "_id",
};

export default DropDowns;
