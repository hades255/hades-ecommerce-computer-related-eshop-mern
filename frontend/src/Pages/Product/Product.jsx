import React, { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";
import apiURL from "../../Api";
import { useParams } from "react-router-dom";

function Product() {
  const Params = useParams();
  const catalog = Params.catalog.toLowerCase().replace(" ", "");
  const [catalogData, setCatalogData] = useState();
  useEffect(async () => {
    await axios.get(`${apiURL}/${catalog}`).then((res) => {
      console.log(res.data);
      setCatalogData(res.data);
    });
  }, []);

  return <div></div>;
}

export default Product;
