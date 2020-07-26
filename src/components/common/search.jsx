import React from "react";
const Search = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      type="search"
      name="query"
      placeholder="Search..."
      aria-label="Search"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    ></input>
  );
};

export default Search;
