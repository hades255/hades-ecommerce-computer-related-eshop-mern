import React, { useState } from "react";

function CartCard({ item }) {
  const [itemCount, setItemCount] = useState(1);
  const changeCount = (operation) => {
    if (operation === "-") {
      setItemCount(itemCount - 1);
    } else {
      setItemCount(itemCount + 1);
    }
  };
  console.log(item);
  return (
    <div className="cartCard__Container">
      <div
        style={{
          backgroundImage: `url(${item.img})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="cartItem__Img"
      ></div>
      <div className="cartItem__Details">
        <div className="cartItem__Name">
          <h2>{item.name}</h2>
        </div>
        <div className="cartItem__Bottom">
          <div className="cartButton">
            <button onClick={() => changeCount("-")}>-</button>
            <span>{itemCount}</span>
            <button onClick={() => changeCount("+")}>+</button>
          </div>
          <div className="priceDetail">
            <span>₹{itemCount * item.reducedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
