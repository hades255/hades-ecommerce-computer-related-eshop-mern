import React from "react";
import "./Catalog.css";

function Catalog() {
  const details = [
    {
      name: "cabinet",
      img: "https://m.media-amazon.com/images/I/51DhaOWyHHL._SL1000_.jpg",
    },
  ];
  const renderCatalog = () => {};
  return (
    <div className="catalog_Container">
      <div className="catalog__Top">
        <h2>Catalog</h2>
        <p>8 items</p>
      </div>
      <div className="catalog_Bottom">{renderCatalog()}</div>
    </div>
  );
}

export default Catalog;
