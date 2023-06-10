import React from "react";
import "./headeramin.css";

const HeaderAdmin = () => {
  return (
    <>
      <div id="header">
        <div class="header__nav">
          <div class="header__nav__logo">
            <img src="/static/image/netflix.png" alt="" />
          </div>
          <div class="header__nav__mavbar">
            <ul>
              <li>
                <a href="/Admin/Home">Home</a>
              </li>
              <li>
                <a href="/Admin/User">User</a>
              </li>
              <li>
                <a href="/Admin/Category">Category</a>
              </li>
              <li>
                <a href="/Admin/Film">Movies</a>
              </li>
              <li>
                <a href="/Admin/Actor">Actor</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="header__filmInfor">
          <div class="header__filmInfor__search">
            <div id="filmInfor__search">
              <i
                class="fa-solid fa-magnifying-glass"
                onclick="searchApear()"
              ></i>
              <input type="text" placeholder="Tiltles, Characters, Genres" />
              <i class="fa-solid fa-xmark SEARCH"></i>
            </div>
          </div>
          <div class="header__filmInfor__account">
            <div class="filmInfor__account__img">
              <img
                src="http://occ-0-325-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQ4A0D_KyHSDA95zx1UA0MK2HgY3_JC2ImiXV48pqZlpA1yUq8ePZdjlQF0_RdJEgT_B-z6bjjsR9jW82wgeXtIW8vM1pb8.png?r=b36"
                alt=""
              />
            </div>
            <div class="filmInfor__account__LogOut">
              <button onclick="LogOut()">Exit Kids</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;