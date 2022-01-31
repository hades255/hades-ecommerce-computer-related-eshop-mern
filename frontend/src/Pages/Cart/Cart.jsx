import React, { useState, useEffect, useContext } from "react";
import apiURL from "../../Api";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import axios from "axios";
import CartCard from "../../Components/Card/CartCard";
import Spinner from "../../Components/Spinner/Spinner";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function Cart() {
  let navigate = useNavigate();

  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
    renderAgain,
    setRenderAgain,
  ] = useContext(DataContext);

  const [cart, setCart] = useState();
  const [reRender, setReRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [finalArr, setFinalArr] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(async () => {
    await axios.get(`${apiURL}/account/${user}/cart`).then((res) => {
      setCart(res.data);
      if (userData.length > 0) {
        setLoading(false);
      }
    });
  }, [userData, reRender]);

  useEffect(async () => {
    if (cart.length > 0) {
      let arr = [...cart];
      setFinalArr([...arr]);
    }
  }, [cart]);

  const handleReRender = () => {
    setReRender(!reRender);
  };

  const onDeleteItem = (obj) => {
    let final = [...finalArr];
    final = final.filter((ele) => ele.id !== obj.id);
    let price = final
      .map((ele) => {
        return ele.total;
      })
      .reduce((a, b) => a + b);
    setFinalPrice(price);
    setFinalArr([...final]);
  };

  const onPriceChange = (obj) => {
    let final = [...finalArr];
    let index;
    for (let i = 0; i < final.length; i++) {
      if (final[i].id === obj.id) {
        index = i;
      }
    }
    if (index !== undefined) {
      final[index].count = obj.count;
      final[index].total = obj.total;
    } else {
      final.push(obj);
    }
    let price = final
      .map((ele) => {
        return ele.total;
      })
      .reduce((a, b) => a + b);
    setFinalPrice(price);
    setFinalArr([...final]);
  };

  const getDate = () => {
    const dateObj = new Date();
    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let fullDate = `${date}/${month + 1}/${year}`;
    return fullDate;
  };
  const getTime = () => {
    const dateObj = new Date();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let time = `${hour}:${min}`;
    return time;
  };

  const placeOrder = async (res) => {
    let date = getDate();
    let time = getTime();
    let orderObj = {
      items: [...finalArr],
      orderId: res.razorpay_order_id,
      price: finalPrice,
      date: date,
      time: time,
    };
    await axios.put(`${apiURL}/account/${user}/orders`, orderObj);
    await axios.put(`${apiURL}/account/${user}/cart/delete`);
    setReRender(!reRender);
    setFinalPrice(0);
    setRenderAgain(!renderAgain);
    navigate("/account");
  };

  const dispalayRazorpay = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    let data;
    await axios
      .post(`${apiURL}/razorpay`, { amount: finalPrice })
      .then((res) => (data = res.data));
    if (data === "Amount exceeds maximum amount allowed.") {
      alert(
        "Because of razorpay test mode, It doesn't accept amount greater than ₹15000. So please update your cart accordingly"
      );
      return;
    }
    const options = {
      key: "API KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "CJ-Stores",
      description: "Dummy Transaction",
      image: "https://i.ibb.co/0nXYpy6/CJ.jpg",
      handler: function (response) {
        placeOrder(response);
      },
      prefill: {
        name: userData[0].name,
        email: userData[0].email,
      },
      notes: {
        address: userData[0].address,
      },
      theme: {
        color: "#e41c1c",
      },
    };
    var paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  const renderItems = () => {
    if (cart.length === 0) {
      return (
        <h2 style={{ fontSize: "3rem", padding: "2rem", textAlign: "center" }}>
          No Items added
        </h2>
      );
    } else {
      return (
        <div className="cart__Items">
          {cart.map((ele) => {
            return (
              <CartCard
                onReRender={handleReRender}
                item={ele}
                handleFinal={onPriceChange}
                handleDelete={onDeleteItem}
              />
            );
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
                <span>Products:</span>
                <span>{cart.length}</span>
              </div>
              <div className="values">
                <span>Price:</span>
                <span>₹{finalPrice}</span>
              </div>
              <div className="address">
                <span>Shipping Address:</span>
                <span>{userData[0].address}</span>
              </div>

              <div className="orderButton">
                <button
                  className={cart.length === 0 ? "blur" : ""}
                  onClick={
                    cart.length === 0
                      ? () => {
                          alert("First add items to cart");
                        }
                      : dispalayRazorpay
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
