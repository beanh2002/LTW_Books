import React, { useState } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD } from "../../../controller/action";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const RecommendCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const addToCart = (e) => {
    var tok = localStorage.getItem("token");
    if (tok != null) {
      dispatch(ADD(e));
    } else {
      navigate.push(`/login`);
    }
  };

  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");
  const onOpenImage = (src) => {
    setImg(src);
    setOpenImage(true);
  };

  return (
    <>
      <div className="product_items">
        {cartItems.map((items) => (
          <div className="box" key={items.id}>
            <div className="img">
              <Link to={`/carts/${items.id}`}>
                <img src={items.BookImage} alt="" />
              </Link>
              <div className="overlay">
                <button className="button" onClick={() => addToCart(items)}>
                  <FiShoppingBag />
                </button>
                <button className="button">
                  <AiOutlineHeart />
                </button>
                <button
                  className="button"
                  onClick={() => onOpenImage(items.BookImage)}
                >
                  <FiSearch />
                </button>
              </div>
            </div>
            <div className="details">
              <h3>
                <Link to={`/carts/${items.id}`}>{items.BookName}</Link>
              </h3>
              <p>{items.Author}</p>
              <h4>${items.Price}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className={openImage ? "modelOpen" : "modelClose"}>
        <div className="onClickImage">
          <img src={img} alt="" />
          <button className="button" onClick={() => setOpenImage(false)}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  );
};
