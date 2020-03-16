import React from "react";

const FilmItem = ({ filmImg, filmName }) => {
  return (
    <div className="filmCard">
      {/* <img src={filmImg} /> */}
      <div className="filmName">{filmName}</div>
    </div>
  );
};

export default FilmItem;
