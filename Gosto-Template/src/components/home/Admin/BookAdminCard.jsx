import React from "react";
import "./bookadmincard.css";
import { Link } from "react-router-dom";

const BookAdminCard = ({ book }) => {
  return (
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
            <Link to="/adminEditBook" className="btn-update">
              <i class="far fa-edit"></i>
            </Link>
            <a className="btn-delete">
              <i class="fas fa-trash"></i>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default BookAdminCard;
