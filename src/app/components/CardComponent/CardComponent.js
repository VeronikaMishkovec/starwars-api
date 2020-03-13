import React from "react";
import ItemInfo from "../ItemInfo/ItemInfo";

import "../CardComponent/CardComponent.scss";

const CardComponent = ({
  imgSrc,
  name,
  gender,
  birth_year,
  eye_color,
  height,
  mass
}) => {
  return (
    <div className="CardWrapper">
      <img src={imgSrc} />
      <ItemInfo head="Name" parametr={name} />
      <ItemInfo head="Gender" parametr={gender} />
      <ItemInfo head="Birth year" parametr={birth_year} />
      <ItemInfo head="Eye color" parametr={eye_color} />
      <ItemInfo head="Height" parametr={height} />
      <ItemInfo head="Mass" parametr={mass} />
    </div>
  );
};

export default CardComponent;
