import React from "react";
import { DATA } from "./../constants/data";

const CellRenderer = ({ id, index }) => {
  return (
    <div
      id={id}
      style={{
        height: 50,
        width: 150,
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {DATA[index].first_name}
    </div>
  );
};

export default CellRenderer;
