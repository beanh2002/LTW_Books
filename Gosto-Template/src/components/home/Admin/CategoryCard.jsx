import React from "react";
import './categorycard.css'
import { Link } from "react-router-dom";

const CategoryCard = ({category}) => {
  return (
    <tbody className="table__user-body">
      {category.map((cate) => (            
        <tr key={cate.id}>
        <td>{cate.id}</td>
        <td>{cate.categoryname}</td>
        <td>
          <Link to={`/adminEditCategory/${cate.id}`}>
            <i className="far fa-edit"></i>
          </Link>
          <button className="btn-delete">
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
      ))}
    </tbody>
  );
};

export default CategoryCard;
