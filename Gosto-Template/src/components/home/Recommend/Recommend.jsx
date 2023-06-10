import { useState } from "react";
import { Heading } from "../../common/Heading";
import { RecommendCard } from "./RecommendCard";
import { useEffect } from "react";
import axios from "axios";

export const Recommend = () => {
  const [cartItems, setCartItems] = useState([]);

  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    var tokenn = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/Admin/Recommend", {
        headers: {
          Authorization: "Bearer " + tokenn,
        },
      })
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setBookData(response.data);
        console.log(bookData);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <section className="product">
        <div className="container">
          <Heading title="Recommend" desc="" />
          <RecommendCard cartItems={bookData} />
        </div>
      </section>
    </>
  );
};
