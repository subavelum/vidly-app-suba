import React from "react";
const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((genre) => (
        <li
          key={genre[valueProperty] || "default"}
          className={
            genre === selectedItem
              ? "clickable list-group-item active"
              : "list-group-item clickable"
          }
          onClick={() => onItemSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
