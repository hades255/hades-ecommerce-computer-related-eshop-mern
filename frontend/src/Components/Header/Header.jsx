import React, { useContext } from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

function Header() {
  const [homeData, loggedIn, setLoggedIn, user, setUser, userData] =
    useContext(DataContext);
  console.log(userData, "header");

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
          <PersonIcon style={{ "font-size": "2.5rem" }} />
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
          <ShoppingCartOutlinedIcon style={{ "font-size": "2.5rem" }} /> 0
        </div>
      </div>
    </div>
  );
}

export default Header;
