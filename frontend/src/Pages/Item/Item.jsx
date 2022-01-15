import React, { useState, useEffect } from "react";
import "./Item.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../Api";
import Spinner from "../../Components/Spinner/Spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Item() {
  const Params = useParams();
  const catalog = Params.catalog.toLowerCase().replace(" ", "");
  const id = Params.id;
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState();

  useEffect(async () => {
    await axios.get(`${apiURL}/${catalog}/${id}`).then((res) => {
      setItemData(res.data);
    });
    setLoading(false);
  }, []);

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
                <button>Add to Cart</button>
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
