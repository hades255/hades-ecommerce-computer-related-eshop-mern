import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Register() {
  const [error, setError] = useState("null");

  const validateCred = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let regexE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    regexE.test(email)
      ? setError("email")
      : regexP.test(pass)
      ? setError("pass")
      : setError("null");
  };
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
