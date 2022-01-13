import React from "react";
import "./Card.css";

function Card({ product }) {
  return (
    <div id={product.id} className="card__Container">
      {console.log(product)}
      <div className="product__Img">
        <div
          className="product__Bgd"
          style={{
            background: `url(${product.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        {/* <img
          //   style={{ width: "40rem", height: "30rem" }}
          src={product.img}
          alt=""
        /> */}
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
