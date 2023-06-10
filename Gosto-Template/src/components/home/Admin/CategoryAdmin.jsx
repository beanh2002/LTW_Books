import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import "./categoryadmin.css";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoryAdmin = () => {
  const [category, setCategory] = useState([]);
  const [click, setClick] = useState(false)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Admin/allcategory")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCategory(response.data);
      })
      .catch((error) => {});
  }, [click]);

  const handle = (id) => {
    if (window.confirm("Do want to delete ?") == true) {
      axios
      .delete("http://127.0.0.1:8000/Admin/xoacategory/" + id)
      .then((response) => {
        setClick(!click);
      })
      .catch((error) => {
      });
    }
  };
  return (
    <>
      <div className="body__content__header">
        <div className="content__header__title">
          <h1>Category</h1>
        </div>
        <div className="content__header__AddCategory">
          <div className="Addcategory">
            <Link to={`/adminAddCategory`}>
              <p>Add Category</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="body__content__listCategory">
        <div className="listCategory__header">
          <div className="listCategory__header__nav">
            <div className="listCategory__header__nav__Show">
              <p>CategoryList</p>
            </div>
            <div className="listCategory__header__nav__Search">
              <div className="nav__search__Category">
                <label for="search__Category">Search</label>
                <input
                  type="text"
                  placeholder="Category"
                  id="search__Category"
                  onchange="searchCategory()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="category__admin">
        <NavbarAdmin className="navbar__admin" />
        {/* <HeaderAdmin /> */}
        <div className="container">
          <div className="row">
            <h1>List Category</h1>
          </div>
          <table className="table__user">
            <thead className="table__user-head">
              <tr>
                <th>ID</th>
                <th>Thể loại</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* <CategoryCard category={category} /> */}
            <tbody className="table__user-body">
              {category.map((cate) => (
                <tr key={cate.id}>
                  <td>{cate.id}</td>
                  <td>{cate.categoryname}</td>
                  <td>
                    <Link to={`/adminEditCategory/${cate.id}`}>
                      <i className="far fa-edit"></i>
                    </Link>
                    <button onClick={() => handle(cate.id)} className="btn-delete">
                      <i className="fas fa-trash"></i>
                    </button>
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

export default CategoryAdmin;
