import React, { useState, useContext } from "react";
import "./Card.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

function Card({ product, catalog }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(`/catalog/${catalog}/${product.id}`);
  };

  const addCart = () => {
    if (user) {
      setCartData(cartData + 1);
    } else {
      navigate("/login");
    }
  };

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
          onClick={navigateToItem}
          className="product__Bgd"
          style={{
            backgroundImage: `url(${product.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="product__Details">
        <h3 onClick={navigateToItem}>{product.name}</h3>
        <detail>
          <rating className="rating">{product.rating}</rating>
          <button onClick={addCart}>Add</button>
        </detail>
        <detail>
          <h2 className="priceTag">
            <span>₹{product.reducedPrice}</span>
            <span>₹{product.originalPrice}</span>
          </h2>
        </detail>
      </div>
    </div>
  );
}

export default Card;
