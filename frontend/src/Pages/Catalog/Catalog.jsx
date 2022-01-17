import React, { useEffect, useState } from "react";
import "./Catalog.css";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import CatalogCard from "../../Components/Card/CatalogCard";
import apiURL from "../../Api";

function Catalog() {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    await axios.get(`${apiURL}/catalog`).then((res) => {
      console.log(res.data);
      setDetails(res.data);
    });
    setLoading(false);
  }, []);

  const renderCatalog = () => {
    let fragment = (
      <div className="catalog__Bottom">
        {details.map((ele) => {
          return <CatalogCard detail={ele} />;
        })}
      </div>
    );
    return fragment;
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="catalog_Container">
          <div className="catalog__Top">
            <h2>Catalog</h2>
            <p>{details.length} items</p>
          </div>
          {renderCatalog()}
        </div>
      )}
    </div>
  );
}

export default Catalog;
