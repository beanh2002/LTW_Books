import { useState } from "react";
import { products } from "../../assets/data/data";
import { Heading } from "../../common/Heading";
import { ProductItems } from "./ProductItems";
import { useEffect } from "react";
import axios from "axios";

export const Product = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Admin/allbook")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCartItems(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <section className="product">
        <div className="container">
          <Heading title="Products" desc="" />
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  );
};
