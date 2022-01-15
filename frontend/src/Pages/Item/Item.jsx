import React, { useState, useEffect } from "react";
import "./Item.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../Api";
import Spinner from "../../Components/Spinner/Spinner";

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
                // position: "fixed",
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
          <div className="item__Reviews"></div>
        </div>
      )}
    </div>
  );
}

export default Item;
