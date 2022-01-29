import React from "react";
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  let navigate = useNavigate();

  const renderItems = () => {
    let fragment = (
      <div>
        {order.items.map((ele) => {
          console.log(ele, "ele");
          return (
            <div className="items__Card">
              <div>{ele.count}X</div>
              <div
                style={{
                  backgroundImage: `url(${ele.img})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "15rem",
                  height: "15rem",
                }}
              ></div>
              <div>{ele.name}</div>
              <div>₹{ele.reducedPrice}</div>
            </div>
          );
        })}
      </div>
    );
    return fragment;
  };

  return (
    <div className="order__Container">
      <div className="order__Top">
        <div>
          <span>Order Id: </span>
          <span>{order.orderId}</span>
        </div>
        <div className="order__Date">
          <span>{order.date}</span>
          <span>{order.time}</span>
        </div>
      </div>
      <div className="order__Bottom">{renderItems()}</div>
    </div>
  );
}

export default OrderCard;
