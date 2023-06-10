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
    try {
      axios.post("http://127.0.0.1:8000/Admin/signup", {
        UserName: username,
        Email: email,
        Password: password,
      });
      // localStorage.setItem('token',response.data['access__token']);
      navigate.push(`/login`);
    } catch (error) {
      // console.error(error);
      alert("Tài khoản hoặc mật khẩu không tồn tại");
      // Handle the error
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form2">
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
      </form>
    </div>
  );
};

export default Signup;
