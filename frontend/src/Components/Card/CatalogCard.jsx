import React from "react";
import { useNavigate } from "react-router-dom";

function CatalogCard({ detail }) {
  const navigate = useNavigate();
  const navigateToCatalog = () => {
    navigate(`/${detail.name}`);
  };
  return (
    <div onClick={navigateToCatalog} className="card__Container">
      <div className="product__Img">
        <div
          className="product__Bgd"
          style={{
            background: `url(${detail.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="product__Details">
        <h3
          style={{
            textAlign: "center",
            textTransform: "capitalize",
            fontSize: "2rem",
          }}
        >
          {detail.name}
        </h3>
      </div>
    </div>
  );
}

export default CatalogCard;
