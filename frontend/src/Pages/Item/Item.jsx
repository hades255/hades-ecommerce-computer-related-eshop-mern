import React, { useState, useEffect, useContext } from "react";
import "./Item.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiURL from "../../Api";
import Spinner from "../../Components/Spinner/Spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DataContext } from "../../Context/DataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Item() {
  const Params = useParams();
  const navigate = useNavigate();
  const catalog = Params.catalog.toLowerCase().replace(" ", "");
  const id = Params.id;
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [itemData, setItemData] = useState();
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);

  useEffect(async () => {
    await axios.get(`${apiURL}/catalog/${catalog}/${id}`).then((res) => {
      setItemData(res.data);
    });
    setLoading(false);
  }, []);

  const toastMsg = (res) => {
    if (res === "success") {
      toast.success("Added to cart");
    } else {
      toast.error("Item already in cart");
    }
  };

  const addCart = async () => {
    if (user) {
      setAdding(true);
      console.log(itemData);
      await axios
        .put(`${apiURL}/account/${user}/cart`, itemData[0])
        .then((res) => {
          if (res.data === "success") {
            toastMsg("success");
            setCartData(cartData + 1);
          } else {
            toastMsg("exist");
          }
        });
      setAdding(false);
    } else {
      navigate("/login");
    }
  };
  const renderComments = () => {
    let cmtArr = itemData[0].comments;
    console.log(cmtArr);
    let fragment = cmtArr.map((ele) => {
      return (
        <div className="review__Container">
          <AccountCircleIcon style={{ fontSize: "5rem" }} />{" "}
          <span>{ele.name}</span>
          <div>
            <rating className="item__Rating">{ele.rating}</rating>
          </div>
          <div className="review__Content">{ele.Comment}</div>
        </div>
      );
    });
    return fragment;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="item__Container">
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
            pauseOnFocusLoss
            draggable
          />
          <div className="item__Details">
            <div
              className="item__Img"
              style={{
                backgroundImage: `url(${itemData[0].img})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="item__Description">
              <div>
                <h2>{itemData[0].name}</h2>
              </div>
              <div>
                <rating className="item__Rating">{itemData[0].rating}</rating>
              </div>
              <div className="item__Price">
                <span>₹{itemData[0].reducedPrice}</span>
                <span>₹{itemData[0].originalPrice}</span>
              </div>
              <div className="item__Button">
                <button
                  style={
                    adding
                      ? { pointerEvents: "none", opacity: "60%" }
                      : { pointerEvents: "all" }
                  }
                  onClick={addCart}
                >
                  {adding ? "..................." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
          <div className="item__Reviews">
            <h3>Customer Reviews</h3>
            <div>{renderComments()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
