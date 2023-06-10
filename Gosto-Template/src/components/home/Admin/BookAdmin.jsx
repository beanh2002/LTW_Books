import React from "react";
import "./bookadmin.css";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
const BookAdmin = () => {
  const [book, setBook] = useState([]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Admin/allbook")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setBook(response.data);
      })
      .catch((error) => {});
  }, [click]);

  const handle = (id) => {
    // window.confirm("Do want to delete ?");
    if (window.confirm("Do want to delete ?") == true) {
      var tokenn = localStorage.getItem("token");
      axios
        .delete("http://127.0.0.1:8000/Admin/delete/" + id, {
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
  return (
    <>
      <div class="container__body">
        <div class="container__body__content">
          <div class="body__content__header">
            <div class="content__header__title">
              <h1>Book</h1>
            </div>
            <div class="content__header__AddFilm">
              <div class="Addfilm">
                <Link to="/adminAddBook">
                  <p>Add Book</p>
                </Link>
              </div>
            </div>
          </div>
          <div class="body__content__listFilm">
            <div class="listFilm__header">
              <div class="listFilm__header__nav">
                <div class="listFilm__header__nav__Show">
                  <p>BookList</p>
                </div>
                <div class="listFilm__header__nav__Search">
                  <div class="nav__search__Film">
                    <label for="search__Film">Search</label>
                    <input
                      type="text"
                      placeholder="Film"
                      id="search__Film"
                      onchange="searchFilm()"
                    />
                  </div>
                </div>
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
            <h1>List Book</h1>
          </div>
          <table className="table__user">
            <thead className="table__user-head">
              <tr>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Ngày phát hành</th>
                <th>Số trang</th>
                <th>Số lượng đã bán</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* <BookAdminCard book={book} /> */}
            <tbody classNameName="table__user-body">
              {book.map((book) => (
                <tr key={book.id}>
                  <td>{book.BookName}</td>
                  <td>{book.Author}</td>
                  <td>{book.Category}</td>
                  <td>{book.Releasedate}</td>
                  <td>{book.PageNumber}</td>
                  <td>10</td>

                  <td>
                    <Link
                      to={`/adminEditBook/${book.id}`}
                      className="btn-update"
                    >
                      <i class="far fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handle(book.id)}
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
      </div>
    </>
  );
};

export default BookAdmin;
