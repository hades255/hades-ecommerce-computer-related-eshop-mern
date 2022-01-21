import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import apiURL from "../../Api";

function CartCard({ user, onReRender, item }) {
  const [itemCount, setItemCount] = useState(1);
  const [total, setTotal] = useState(item.reducedPrice);

  useEffect(() => {
    setTotal(itemCount * item.reducedPrice);
  }, [itemCount]);

  const changeCount = async (operation) => {
    if (operation === "-") {
      if (itemCount === 1) {
        deleteItem();
      } else {
        setItemCount(itemCount - 1);
      }
    } else {
      setItemCount(itemCount + 1);
    }
  };

  const deleteItem = async () => {
    await axios.delete(`${apiURL}/account/${user}/cart/${item.id}`);
    onReRender();
  };

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
            <button id="minusBtn" onClick={() => changeCount("-")}>
              -
            </button>
            <span>{itemCount}</span>
            <button onClick={() => changeCount("+")}>+</button>
          </div>
          <div className="priceDetail">
            <span>₹{total}</span>
          </div>
        </div>
      </div>
      <div className="deleteBtn">
        <DeleteIcon
          onClick={deleteItem}
          style={{
            fontSize: "3rem",
            color: "#f77171",
            borderLeft: " 0.2rem solid #cbcbcb",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default CartCard;
