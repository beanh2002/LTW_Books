import React, { useState } from "react";
import "./addcategory.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddCategory = () => {
  const [value, setvalue] = useState({
    category: "",
  });

  const navigate = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/Admin/themcategory", value)
      .then((res) => {
        navigate.push(`/adminCategory`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div class="container__body__content">
        <div class="body__content__header">
          <div class="content__header__title">
            <h1>Add Category</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} class="body__content__Category">
          <div class="Category__infor" id="categoryEdit__inFor">
            <div class="Category__infor__CategoryName">
              <label for="CategoryName">CategoryName</label>
              <input
                type="text"
                onChange={(e) =>
                  setvalue({ ...value, category: e.target.value })
                }
                id="CategoryName"
              />
            </div>
          </div>
          <div class="Save__Change">
            <button className="subm">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
