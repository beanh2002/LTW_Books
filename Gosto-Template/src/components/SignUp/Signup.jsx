import React from "react";
import "./signup.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useHistory();
  const handleSubmit = () => {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    axios
      .post("http://127.0.0.1:8000/Admin/signup", {
        UserName: username,
        Email: email,
        Password: password,
      })
      .then(function (response) {
        navigate.push(`/login`);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          alert(
            Object.keys(error.response.data)[0] +
              ": " +
              error.response.data[Object.keys(error.response.data)[0]]
          );
          // Additional handling for 400 status code
        } else {
          console.error("Error:", error.message);
        }
      });
    // localStorage.setItem('token',response.data['access__token']);
    // navigate.push(`/login`);
  };
  return (
    <div className="Auth-form-container">
      <div className="Auth-form2">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered ?{" "}
            <Link className="sign" to="/login">
              Login
            </Link>
          </div>
          <div className="fo">
            <label>User Name</label>
            <input
              id="username"
              className="in"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className="fo">
            <label>Email address</label>
            <input
              id="email"
              className="in"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="fo">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="in"
              placeholder="Enter password"
            />
          </div>
          <div className="submit">
            <button onClick={handleSubmit} type="submit" className="sub">
              Submit
            </button>
          </div>
          <p className="pass mt-2">
            Forgot <a href="/#">password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
