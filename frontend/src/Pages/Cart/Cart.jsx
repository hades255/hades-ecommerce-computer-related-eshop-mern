import React, { useState, useEffect, useContext } from "react";
import apiURL from "../../Api";
import "./Cart.css";
import { DataContext } from "../../Context/DataContext";
import axios from "axios";
import CartCard from "../../Components/Card/CartCard";
import Spinner from "../../Components/Spinner/Spinner";

function Cart() {
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);
  console.log(userData);

  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios.get(`${apiURL}/account/${user}/cart`).then((res) => {
      console.log(res.data);
      setCart(res.data);
      if (userData.length > 0) {
        setLoading(false);
      }
    });
  }, [userData]);

  const renderItems = () => {
    if (cart.length === 0) {
      return <h2>No Items added</h2>;
    } else {
      return (
        <div className="cart__Items">
          {cart.map((ele) => {
            return <CartCard item={ele} />;
          })}
        </div>
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="cart__Container">
          <div className="cart__Left">
            <div>
              <h1>My Cart ({cart.length})</h1>
            </div>
            <div>{renderItems()}</div>
          </div>
          <div style={{ width: "40%" }} className="cart__Right">
            <div>
              <h1>Details</h1>
            </div>
            <div>
              <div className="values">
                <span>Items:</span>
                <span>{cart.length}</span>
              </div>
              <div className="values">
                <span>Price:</span>
                <span>₹{cart[0].reducedPrice}</span>
              </div>
              <div className="address">
                <span>Shipping Address:</span>
                <span>{userData[0].address}</span>
              </div>

              <div className="orderButton">
                <button>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
