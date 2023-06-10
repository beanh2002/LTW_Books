import React from "react";
import './navbaradmin.css'
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  const data = [
    {
      path: "/admin",
      cateName: "Home",
    },
    {
      path: "/adminCategory",
      cateName: "Category",
    },
    {
      path: "/adminBook",
      cateName: "Book",
    },
  ];

  return (
    <>
      <div className="category category__admin_2">
        {data.map((value, index) => {
          return (
            <div className="box f_flex category_items" key={index}>
              <Link to={value.path}><span>{value.cateName}</span></Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NavbarAdmin;
