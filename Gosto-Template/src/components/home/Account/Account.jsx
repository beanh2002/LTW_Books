import React from "react";
import "./account.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Account = () => {
  const [info, setInfo] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    var tokenn = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/Admin/userid", {
        headers: {
          Authorization: "Bearer " + tokenn,
        },
      })
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {});
  }, []);

  const [booked, setBooked] = useState([]);
  useEffect(() => {
    var tokenn = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/Admin/BoughtAc", {
        headers: {
          Authorization: "Bearer " + tokenn,
        },
      })
      .then((response) => {
        setBooked(response.data);
      })
      .catch((error) => {});
  }, [click]);

  const handle = (id) => {
    if (window.confirm("Do want to delete ?") == true) {
      var tokenn = localStorage.getItem("token");
      axios
        .delete("http://127.0.0.1:8000/Admin/huydon/" + id, {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        })
        .then((response) => {
          setClick(!click);
        })
        .catch((error) => {});
    }
  };

  const { id, username, email } = info;
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Infor</h1>
        </div>
        <table className="table__user">
          <thead className="table__user-head">
            <tr>
              <th>Id</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody classNameName="table__user-body">
            <tr>
              <td>{id}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>
                <a className="btn-update">
                  <i class="far fa-edit"></i>
                </a>
                <a className="btn-delete">
                  <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="row">
          <h1> History </h1>
        </div>
        <table className="table__user">
          <thead className="table__user-head">
            <tr>
              <th>UserName</th>
              <th>BookName</th>
              <th>Quantity</th>
              <th>PurchasedPrice</th>
              <th>StatusBuy</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody classNameName="table__user-body">
            {booked.map((book) => (
              <tr>
                <td>{book.username}</td>
                <td>{book.bookname}</td>
                <td>{book.quantity}</td>
                <td>{book.purchasedprice}</td>
                <td>{book.statusbuy}</td>
                <td>
                  <a className="btn-update">
                    <i class="far fa-edit"></i>
                  </a>
                  <button
                    onClick={() => handle(book.billid)}
                    className="btn-delete"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Account;
