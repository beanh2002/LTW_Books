import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditBook = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      setImageUrl(src);
    }
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Admin/allcategory")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCategory(response.data);
      })
      .catch((error) => {});
  }, []);

  const navigate = useHistory();

  const handlesubmit = () => {
    var Bookname = document.getElementById("BookName").value;
    var Author = document.getElementById("Author").value;
    var Contentbook = document.getElementById("Contentbook").value;
    var Releasedate = document.getElementById("date").value;
    var Pagenumber = document.getElementById("page").value;
    var CategoryId = document.getElementById("Category").value;
    var Image = document.getElementById("Image");
    var Price = document.getElementById("Price").value;

    const formData = new FormData();
    formData.append("bookname", Bookname);
    formData.append("author", Author);
    formData.append("contentbook", Contentbook);
    formData.append("releasedate", Releasedate);
    formData.append("pagenumber", Pagenumber);
    formData.append("category", CategoryId);
    formData.append("bookimage", Image.files[0]);
    formData.append("price", Price);

    axios
      .patch("http://127.0.0.1:8000/Admin/update/"+window.location.pathname.substring(15), formData, {})
      .then((response) => {
        navigate.push(`/adminBook`);
        alert("oke");
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="container__body">
        <div className="container__body__content">
          <div className="body__content__header">
            <div className="content__header__title">
              <h1>Book</h1>
            </div>
          </div>
          <div className="body__content__Film">
            <div className="Film__infor">
              <div className="Film__infor__content">
                <div className="Film__input__Text">
                  <div className="addbook__flex">
                    <div className="content__Film__input">
                      <label for="FilmName">Tên sách</label>
                      <input type="text" id="BookName" />
                    </div>
                    <div className="content__Film__input">
                      <label for="FilmName">Tác giả</label>
                      <input type="text" id="Author" />
                    </div>
                  </div>
                  <div className="content__Film__input">
                    <label for="Description">Mô tả</label>
                    <textarea name="" id="Contentbook"></textarea>
                  </div>
                  <div className="addbook__flex">
                    <div className="content__Film__input">
                      <label for="FilmName">Ngày phát hành</label>
                      <input type="date" id="date" />
                    </div>
                    <div className="content__Film__input">
                      <label for="FilmName">Số trang</label>
                      <input type="number" id="page" />
                    </div>
                  </div>
                  <div className="content__Film__input">
                      <label for="FilmName">Price</label>
                      <input type="number" id="Price" />
                    </div>
                  <div className="content__Film__input">
                    <label for="Type">Category</label>
                    <select id="Category">
                      {category.map((cate) => (
                        <option value={cate.id}>{cate.categoryname}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="Film__input__file">
                  <div className="input__file">
                    <label for="">Image</label>
                    <div className="Change__inputFile">
                      <img alt="" id="hienthianh" src={imageUrl} />
                      <input
                        type="file"
                        className="input-file"
                        accept="image/*"
                        id="Image"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Save__Change">
              <button onClick={() => handlesubmit()}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBook;
