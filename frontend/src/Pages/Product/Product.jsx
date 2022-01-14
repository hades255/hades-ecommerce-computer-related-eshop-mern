import React, { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";
import apiURL from "../../Api";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams } from "react-router-dom";

function Product() {
  const Params = useParams();
  const catalog = Params.catalog;
  const [catalogData, setCatalogData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    await axios
      .get(`${apiURL}/${catalog.toLowerCase().replace(" ", "")}`)
      .then((res) => {
        console.log(res.data);
        setCatalogData(res.data);
      });
    setLoading(false);
  }, []);

  const renderProducts = () => {
    let fragment = catalogData.map((ele) => {
      return <Card product={ele} />;
    });
    return fragment;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="product__Container">
          <div className="product__Left">
            <h3>{catalog}</h3>
            <div className="filter">
              <FilterAltIcon style={{ fontSize: "2rem" }} />
              <span>Sort By</span>
            </div>
            <div className="price__Filter">
              <p>Price:</p>
              <div>
                <input type="radio" name="fav_language" value="Low" />{" "}
                <label htmlFor="">Low to High</label>
              </div>
              <div>
                <input type="radio" name="fav_language" value="High" />{" "}
                <label htmlFor="">High to Low</label>
              </div>
            </div>
            <div className="rating__Filter">
              <p>Rating:</p>
              <div>
                <input type="checkbox" name="fav_language" value="4.5" />{" "}
                <label htmlFor="">Above 4.5</label>
              </div>
              <div>
                <input type="checkbox" name="fav_language" value="4.0" />{" "}
                <label htmlFor="">Above 4.0</label>
              </div>
              <div>
                <input type="checkbox" name="fav_language" value="3.0" />{" "}
                <label htmlFor="">Above 3.0</label>
              </div>
            </div>
          </div>
          <div className="product__Right">{renderProducts()}</div>
        </div>
      )}
    </div>
  );
}

export default Product;
