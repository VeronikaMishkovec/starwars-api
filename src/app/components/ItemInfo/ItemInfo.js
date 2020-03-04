import React from "react";

import "../ItemInfo/ItemInfo.scss";

const ItemInfo = ({ head, parametr }) => {
  return (
    <div className="NameWrapper">
      <h3>{head}</h3>
      <div>{parametr}</div>
    </div>
  );
};

export default ItemInfo;
