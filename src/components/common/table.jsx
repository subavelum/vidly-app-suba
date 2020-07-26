import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, onSort, sortColumn, columns, user }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} user={user} />
    </table>
  );
};

export default Table;
