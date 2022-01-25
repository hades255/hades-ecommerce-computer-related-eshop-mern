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
  const [renderData, setRenderData] = useState();

  const [loading, setLoading] = useState(true);
  const [radVal, setRadVal] = useState("default");
  const [checkVal, setCheckVal] = useState(0);
  const [checkBoxArr, setCheckBoxArr] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${apiURL}/catalog/${catalog.toLowerCase().replace(" ", "")}`)
      .then((res) => {
        setRenderData(res.data);
        setCatalogData(res.data);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (catalogData) {
      changeData();
    }
  }, [radVal, checkVal]);

  const radioOnchange = (e) => {
    setRadVal(e.target.value);
  };

  const checkboxOnchange = (e) => {
    let value = e.target.value;
    let arr = checkBoxArr;
    if (e.target.checked) {
      arr.push(value);
    } else {
      arr.splice(checkBoxArr.indexOf(value), 1);
    }
    arr = arr.sort((a, b) => a - b);
    setCheckBoxArr([...arr]);
    setCheckVal(checkBoxArr[0] ? checkBoxArr[0] : 0);
  };

  const changeData = () => {
    let sortedData;
    let filterData = catalogData.filter((ele) => ele.rating > checkVal);
    if (radVal === "Low") {
      sortedData = filterData.sort((a, b) => a.reducedPrice - b.reducedPrice);
    } else if (radVal === "High") {
      sortedData = filterData.sort((a, b) => b.reducedPrice - a.reducedPrice);
    } else {
      sortedData = filterData;
    }
    setRenderData([...sortedData]);
  };

  const renderProducts = () => {
    let fragment = renderData.map((ele) => {
      return <Card product={ele} catalog={catalog} />;
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
                <input
                  onChange={radioOnchange}
                  type="radio"
                  name="priceSort"
                  value="Low"
                />{" "}
                <label htmlFor="">Low to High</label>
              </div>
              <div>
                <input
                  onChange={radioOnchange}
                  type="radio"
                  name="priceSort"
                  value="High"
                />{" "}
                <label htmlFor="">High to Low</label>
              </div>
            </div>
            <div className="rating__Filter">
              <p>Rating:</p>
              <div>
                <input
                  onChange={checkboxOnchange}
                  type="checkbox"
                  name="ratingSort"
                  value="4.5"
                />
                <label htmlFor="">Above 4.5</label>
              </div>
              <div>
                <input
                  onChange={checkboxOnchange}
                  type="checkbox"
                  name="ratingSort"
                  value="4.0"
                />{" "}
                <label htmlFor="">Above 4.0</label>
              </div>
              <div>
                <input
                  onChange={checkboxOnchange}
                  type="checkbox"
                  name="ratingSort"
                  value="3.0"
                />{" "}
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
