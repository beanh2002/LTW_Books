import React, { useState } from "react";
import { MdStarRate } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action";
import Review from "../reviews/Review";
import { useEffect } from "react";
import axios from "axios";

const DetailPro = () => {
  const [qty, setQty] = useState(0)
  const [data,setData]=useState([]);
  useEffect(
    ()=>{
      axios.get('http://127.0.0.1:8000/Admin/book/'+window.location.pathname.substring(7))
      .then(response => {
          // Lưu dữ liệu trả về vào state
          setData(response.data);
      })
      .catch(error => {
          console.log(error);
      });
    },[]
  )

  const {id,BookName,ContentBook, PageNumber, Price, BookImage, Author, Category} = data


  // delete item
  const history = useHistory();
  const deletes = (id) => {
    dispatch(DELETE(id));
    history.push("/");
  };

  // increment item
  const dispatch = useDispatch();
  const increment = (e) => {
    dispatch(ADD(e));
    setQty(qty+1)
  };

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item));
    setQty(qty-1)
  };

  return (
    <>
      <article>
        <section className="details">
          <h2 className="details_title">Product Details Pages</h2>
            <div className="details_content">
              <div className="details_content_img">
                <img src={BookImage} alt="" />
              </div>
              <div className="details_content_detail">
                <h1>{BookName}</h1>
                <h3> ${Price * qty}</h3>
                <p>{Author}</p>
                <div className="qty">
                  <div className="count">
                    <button onClick={() => increment(data)}>
                      <AiOutlinePlus />
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={
                        qty <= 1
                          ? () => deletes(id)
                          : () => decrement(data)
                      }
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                </div>
                <div className="desc">
                  <h4>PRODUCTS DESCRIPTION</h4>
                  <p>
                    {ContentBook}
                  </p>
                  <h4> PRODUCT DETAILS</h4>
                  <ul>
                    <li>
                      <p>{PageNumber}</p>
                    </li>
                    <li>
                      <p>{Category}</p>
                    </li>
                    <li>
                      <p>
                        Dimensions and Weight: Height: 80 cm, Weight: 5.3 kg
                      </p>
                    </li>
                    <li>
                      <p>Length: 48cm</p>
                    </li>
                    <li>
                      <p>Depth: 52 cm</p>
                    </li>
                    <li>
                      <p>Seat Height: 44 cm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          <Review />
        </section>
      </article>
    </>
  );
};

export default DetailPro;
