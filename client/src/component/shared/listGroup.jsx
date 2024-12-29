import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textDataProperty,
    valueDataProperty,
    selectedItem,
    onItemSelect,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueDataProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textDataProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textDataProperty: "name",
  valueDataProperty: "_id",
};

export default ListGroup;
