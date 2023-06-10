import React, { useState } from "react";
import "./review.css";
import { ListGroup } from "reactstrap";
import axios from "axios";
import { useEffect } from "react";

const Review = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState([]);
  const [click, setClick] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    var comment = document.getElementById("comment").value;
    var tokenn = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/Admin/PostRatingAndComment/" +
          window.location.pathname.substring(7),
        {
          Rate: rating,
          Comment: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        }
      )
      .then((res) => {
      alert("hi");
      setClick(!click)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/Admin/comment/" +
          window.location.pathname.substring(7)
      )
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setComment(response.data);
      })
      .catch((error) => {});
  }, [click]);

  return (
    <div className="tour__reviews mt-4">
      <h4>Reviews</h4>

      <form onSubmit={handleSubmit}>
        <div className="rating__group">
          <span onClick={() => setRating(1)}>
            1 <i className="fas fa-star rating__start"></i>
          </span>
          <span onClick={() => setRating(2)}>
            2 <i className="fas fa-star rating__start"></i>
          </span>
          <span onClick={() => setRating(3)}>
            3 <i className="fas fa-star rating__start"></i>
          </span>
          <span onClick={() => setRating(4)}>
            4 <i className="fas fa-star rating__start"></i>
          </span>
          <span onClick={() => setRating(5)}>
            5 <i className="fas fa-star rating__start"></i>
          </span>
        </div>
        <div className="review__input">
          <input
            type="text"
            id="comment"
            placeholder="share your thoughts"
            required
          />
          <button className="primary__btn">Submit</button>
        </div>
      </form>

      <ListGroup className="user__reviews">
        {comment.map((com) => (
          <div className="review__item">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/12/15/52/chat-150496_960_720.png"
              alt=""
            />
            <div className="w-100">
              <div className="review__item-user">
                <div>
                  <h5>{com.name}</h5>
                </div>
                <span className="d-flex align-items-center">
                  {com.rate}
                  <i className=" fas fa-star"></i>
                </span>
              </div>
              <h6>{com.comment}</h6>
            </div>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default Review;
