import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Register() {
  return (
    <div className="login__Container">
      <div className="login__Form">
        <form action="">
          <div className="header__Title">
            <Link style={{ textDecoration: "none" }} to="/">
              <span>CJ</span>
              <span>STORES</span>
            </Link>
          </div>
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <p>Username</p>
            <input type="text" required />
          </div>
          <div>
            <p>Email</p>
            <input type="text" required />
          </div>
          <div>
            <p>Address</p>
            <input type="text" required />
          </div>
          <div>
            <p>Password</p>
            <input type="password" required />
          </div>
          <div>
            <p>Confirm Password</p>
            <input type="password" required />
          </div>
          <div className="login__Button">
            <button value="submit">Register</button>
          </div>
          <div>
            <span>Existing user?</span>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
