import React, { useContext } from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

function Header() {
  const [homeData, loggedIn, setLoggedIn] = useContext(DataContext);

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
            to={loggedIn ? "/account" : "/login"}
          >
            <div style={{ padding: "0" }}>My Account</div>
          </Link>
        </div>
        <div>
          <ShoppingCartOutlinedIcon style={{ "font-size": "2.5rem" }} /> Cart
        </div>
      </div>
    </div>
  );
}

export default Header;
