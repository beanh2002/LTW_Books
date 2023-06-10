import React from "react";
import "./admin.css";
import NavbarAdmin from "./NavbarAdmin";
import UserAdmin from "./UserAdmin";
import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Admin/alluser")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setInfo(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <div class="body__content__listFilm">
        <div class="listFilm__header">
          <div class="listFilm__header__nav">
            <div class="listFilm__header__nav__Show">
              <p>UserList</p>
            </div>
            <div class="listFilm__header__nav__Search">
              <div class="nav__search__Film">
                <label for="search__Film">Search</label>
                <input
                  type="text"
                  placeholder="Book"
                  id="search__Film"
                  onchange="searchFilm()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home__admin">
        <NavbarAdmin className="navbar__admin" />
        {/* <UserAdmin info={info} className="user__admin" /> */}

        <div className="container">
          <div className="row">
            <h1>List User</h1>
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
              {info.map((info) => (
                <tr key={info.id}>
                  <td>{info.id}</td>
                  <td>{info.username}</td>
                  <td>{info.email}</td>
                  <td>
                    <a className="btn-update">
                      <i class="far fa-edit"></i>
                    </a>
                    <a className="btn-delete">
                      <i class="fas fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
