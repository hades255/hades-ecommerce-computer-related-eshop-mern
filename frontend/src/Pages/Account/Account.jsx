import React, { useState, useEffect, useContext } from "react";
import "./Account.css";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "axios";
import apiURL from "../../Api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import OrderCard from "../../Components/Card/OrderCard";

function Account() {
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
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    await axios.get(`${apiURL}/account/${user}`).then((res) => {
      let order = res.data[0].orders;
      console.log(order);
      setOrderDetails([...order]);
      setAccount([...res.data]);
    });
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cjuser");
    setUser(undefined);
    navigate("/");
    setRenderAgain(!renderAgain);
  };

  const renderOrder = () => {
    let fragement;
    if (orderDetails.length > 0) {
      fragement = (
        <div className="orders">
          {orderDetails.map((ele) => {
            return <OrderCard order={ele} />;
          })}
        </div>
      );
    } else {
      fragement = (
        <div className="orders">
          <h3>Nothing to Show</h3>
        </div>
      );
    }

    return fragement;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="account__Container">
          <div className="account__Top">
            <div>
              <h2>{account[0].username}</h2>
              <p>
                Mail : <span>{account[0].email}</span>
              </p>
              <p>
                Address :<span>{account[0].address}</span>
              </p>
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="account__Bottom">
            <div>
              <h2>Your Orders:</h2>
            </div>
            <div className="order__Detail">{renderOrder()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
