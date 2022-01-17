import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiURl from "../../Api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import "./Login.css";

function Login() {
  const [
    homeData,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    userData,
    setUserData,
  ] = useContext(DataContext);
  const [validate, setValidate] = useState("null");
  let navigate = useNavigate();

  const validateCred = async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let obj = {
      email: email,
      password: pass,
    };
    await axios
      .post(`${apiURl}/login`, obj)
      .then(async (res) => {
        if (res.data === "success") {
          localStorage.setItem("cjuser", email);
          await axios.get(`${apiURl}/account/${email}`).then((res) => {
            setUserData(res.data);
          });
          setUser(true);
          navigate("/");
        } else {
          setValidate(res.data);
        }
      })
      .catch((err) => console.log(err));
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
                : ""}
            </p>
          </div>
          <div className="login__Button">
            <button onClick={validateCred} value="">
              Login
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
