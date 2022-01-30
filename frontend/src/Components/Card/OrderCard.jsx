import React from "react";
import { useNavigate } from "react-router-dom";
import OrderItemCard from "./OrderItemCard";

function OrderCard({ order }) {
  let navigate = useNavigate();

  const renderItems = () => {
    let fragment = (
      <div>
        {order.items.map((ele) => {
          return <OrderItemCard ele={ele} />;
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
      <div className="order__Total">
        <span>
          Total: <strong>{order.price}</strong>{" "}
        </span>
      </div>
    </div>
  );
}

export default OrderCard;
