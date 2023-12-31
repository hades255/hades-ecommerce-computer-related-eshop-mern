import React, { useState, useContext, useEffect } from "react";
import "./Card.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import apiURL from "../../Api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card({ product, catalog }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
    renderAgain,
    setRenderAgain,
  ] = useContext(DataContext);
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(`/catalog/${catalog}/${product.id}`);
  };

  const toastMsg = (res) => {
    if (res === "success") {
      toast.success("Added to cart");
    } else {
      toast.error("Item already in cart");
    }
  };

  const addCart = async () => {
    console.log("loading");
    if (user) {
      setLoading(true);

      await axios.put(`${apiURL}/account/${user}/cart`, product).then((res) => {
        if (res.data === "success") {
          toastMsg("success");
          setRenderAgain(!renderAgain);
        } else {
          toastMsg("exist");
        }
        setLoading(false);
      });
    } else {
      navigate("/login");
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  return (
    <div id={product.id} className="card__Container">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
      />

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
          <button
            style={
              loading
                ? { pointerEvents: "none", opacity: "60%" }
                : { pointerEvents: "all" }
            }
            onClick={addCart}
          >
            {loading ? "....." : "Add"}
          </button>
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
