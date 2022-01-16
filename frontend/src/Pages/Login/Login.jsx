import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
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
            <h2>Login</h2>
          </div>
          <div>
            <p>Email</p>
            <input type="text" required />
          </div>
          <div>
            <p>Password</p>
            <input type="password" required />
          </div>
          <div className="login__Button">
            <button value="submit">Login</button>
          </div>
          <div>
            <span>New user?</span>
            <Link to="/register">
              <span>Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
