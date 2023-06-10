import { useState } from "react";
import { products } from "../../assets/data/data";
import { Heading } from "../../common/Heading";
import { ProductItems } from "./ProductItems";
import { Hero } from "../Hero/Hero";

export const ProductShop = () => {
  const [cartItems, setCartItems] = useState(products);
  return (
    <>
      <section className="product">
        <div className="container">
          <Hero />
          <Heading title="Products" desc="" />
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  );
};
