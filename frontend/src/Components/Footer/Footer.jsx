import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer__Container">
      <div className="footer__Title">
        <p>Copyright ©2022 All rights reserved</p>
        <Link style={{ textDecoration: "none" }} to="/">
          <span>CJ</span>
          <span>STORES</span>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
