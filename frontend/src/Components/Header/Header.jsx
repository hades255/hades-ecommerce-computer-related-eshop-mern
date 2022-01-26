import React, { useContext, useEffect } from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import apiURL from "../../Api";
import axios from "axios";

function Header() {
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
  console.log(user);
  useEffect(async () => {
    await axios.get(`${apiURL}/account/${user}/cart`).then((res) => {
      setCartData(res.data.length);
    });
  }, [userData, renderAgain]);

  return (
    <div className="header__Container">
      <div className="header__Title">
        <Link style={{ textDecoration: "none" }} to="/">
          <span>CJ</span>
          <span>STORES</span>
        </Link>
      </div>
      <div className="navigation__Menus">
        <Link style={{ textDecoration: "none" }} to="/catalog">
          <div>Catalog</div>
        </Link>

        <div>
          {user ? <PersonIcon style={{ fontSize: "2.5rem" }} /> : ""}

          <Link
            style={{ textDecoration: "none" }}
            to={user ? "/account" : "/login"}
          >
            <div style={{ padding: "0" }}>
              {user ? (userData[0] ? userData[0].username : "User") : "Login"}
            </div>
          </Link>
        </div>
        <div>
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to={user ? "/cart" : "/login"}
          >
            <ShoppingCartOutlinedIcon
              style={{ fontSize: "2.5rem", color: "#5f5f5f" }}
            />
            <span>{cartData ? cartData : 0}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
