import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiURl from "../../Api";
import { DataContext } from "../../Context/DataContext";

import "./Login.css";

function Register() {
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);
  const [error, setError] = useState("null");
  let navigate = useNavigate();

  const validateCred = async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let uname = document.getElementById("uname").value;
    let cpass = document.getElementById("cpass").value;
    let address = document.getElementById("address").value;
    let obj = {
      username: uname,
      email: email,
      address: address,
      password: pass,
      orders: [],
      cart: [],
    };
    let regexE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (email && pass && uname && cpass && address) {
      regexE.test(email)
        ? pass === cpass
          ? regexP.test(pass)
            ? await axios.post(`${apiURl}/register`, obj).then(async (res) => {
                if (res.data === "exist") {
                  setError("exist");
                } else {
                  localStorage.setItem("cjuser", email);
                  let account = await fetch(`${apiURl}/account/${email}`).then(
                    (res) => res.json()
                  );
                  setUserData([...account]);
                  setUser(true);
                  navigate("/");
                }
              })
            : setError("pass")
          : setError("mismatch")
        : setError("emailError");
    } else {
      setError("missing");
    }
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
            <input id="uname" type="text" required />
          </div>
          <div>
            <p>Email</p>
            <input id="email" type="text" required />
          </div>
          <div>
            <p>Address</p>
            <input id="address" type="text" required />
          </div>
          <div>
            <p>Password</p>
            <input id="pass" type="password" required />
          </div>
          <div>
            <p>Confirm Password</p>
            <input id="cpass" type="password" required />
          </div>
          <div>
            <p style={{ color: "red", fontSize: "1.5rem" }}>
              {error === "emailError"
                ? "Enter valid e-mail address"
                : error === "pass"
                ? "Password must be 6 to 20 characters and should contain atleast one numeric digit, one uppercase and one lowercase letter"
                : error === "missing"
                ? "Enter all the required fields"
                : error === "mismatch"
                ? "Confirm Password doesn't match"
                : error === "exist"
                ? "Account already exixt. Kindly login"
                : ""}
            </p>
          </div>
          <div className="login__Button">
            <button
              onClick={validateCred}
              style={{ cursor: "pointer" }}
              value="submit"
            >
              Register
            </button>
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
