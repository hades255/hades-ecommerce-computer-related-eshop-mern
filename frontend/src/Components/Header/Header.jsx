import React from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
  return (
    <div className="header__Container">
      <div className="header__Title">
        <span>CJ</span>
        <>STORES</>
      </div>
      <div className="navigation__Menus">
        <div>Catalog</div>
        <div>
          <PersonIcon style={{ "font-size": "2.5rem" }} />
          My Account
        </div>
        <div>
          <ShoppingCartOutlinedIcon style={{ "font-size": "2.5rem" }} /> Cart
        </div>
      </div>
    </div>
  );
}

export default Header;
