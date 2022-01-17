import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiURl from "../../Api";
import { DataContext } from "../../Context/DataContext";
import "./Login.css";

function Login() {
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);
  const [validate, setValidate] = useState("null");
  const [fetching, setFetching] = useState(false);
  let navigate = useNavigate();

  const validateCred = async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    if (email && pass) {
      let obj = {
        email: email,
        password: pass,
      };
      setFetching(true);
      await axios
        .post(`${apiURl}/login`, obj)
        .then(async (res) => {
          if (res.data === "success") {
            localStorage.setItem("cjuser", email);
            let account = await fetch(`${apiURl}/account/${email}`).then(
              (res) => res.json()
            );
            setUserData([...account]);
            setUser(true);
            navigate("/");
          } else {
            setValidate(res.data);
          }
        })
        .catch((err) => console.log(err));
      setFetching(false);
    } else {
      setValidate("missing");
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
            <h2>Login</h2>
          </div>
          <div>
            <p>Email</p>
            <input id="email" type="text" required />
          </div>
          <div>
            <p>Password</p>
            <input id="pass" type="password" required />
          </div>
          <div>
            <p style={{ color: "red", fontSize: "1.5rem" }}>
              {validate === "emailError"
                ? "Account not found. Kindly register"
                : validate === "pwdError"
                ? "Incorrect Password"
                : validate === "missing"
                ? "Enter all the required field"
                : ""}
            </p>
          </div>
          <div className="login__Button">
            <button
              onClick={fetching ? () => {} : validateCred}
              style={{ cursor: fetching ? "not-allowed" : "pointer" }}
              value=""
            >
              {fetching ? "......." : "Login"}
            </button>
          </div>
          <div>
            <span>New user?</span>
            <Link to="/register" state={{ color: "blue" }}>
              <span>Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
