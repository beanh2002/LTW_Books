import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState([]);
  const navigate = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    try {
      const response = await axios.post("http://127.0.0.1:8000/Admin/login", {
        email: email,
        password: password,
      });

      // console.log(response.data);
      localStorage.setItem("token", response.data["access__token"]);
      var tokenn = localStorage.getItem("token");
      axios
        .get("http://127.0.0.1:8000/Admin/giaima", {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        })
        .then((response) => {
          setRole(response.data);
          console.log(response.data);
          if (response.data.Roles.includes("Admin")) {
            navigate.push(`/admin`);
          }else{
          navigate.push(`/home`);
          }
        });
    } catch (error) {
      // console.error(error);
      alert("Tài khoản hoặc mật khẩu không tồn tại");
      // Handle the error
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form1">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <Link className="sign" to="/signup">
              Sign Up
            </Link>
          </div>
          <div className="fo">
            <label>Email address</label>
            <input
              className="in"
              id="email"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="fo">
            <label>Password</label>
            <input
              type="password"
              className="in"
              id="password"
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

export default Login;
