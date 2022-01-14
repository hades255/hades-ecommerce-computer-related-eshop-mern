import React, { useState } from "react";
import "./Card.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function Card({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
  };

  return (
    <div id={product.id} className="card__Container">
      <div className="product__Img">
        <div onClick={handleFavorite} className="fav">
          {isFavorite ? (
            <FavoriteIcon style={{ "font-size": "2rem" }} />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ "font-size": "2rem" }} />
          )}
        </div>
        <div
          className="product__Bgd"
          style={{
            background: `url(${product.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="product__Details">
        <h3>{product.name}</h3>
        <detail>
          <rating className="rating">{product.rating}</rating>
          <button>Add</button>
        </detail>
        <detail>
          <h2 className="priceTag">
            <span>₹{product.originalPrice}</span>
            <span>₹{product.reducedPrice}</span>
          </h2>
        </detail>
      </div>
    </div>
  );
}

export default Card;
