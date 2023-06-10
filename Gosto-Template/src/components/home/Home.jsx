import React from "react";
import { Blog } from "./blog/Blog";
import { Card } from "./Hero/Card";
import { Hero } from "./Hero/Hero";
import { Recommend } from "./Recommend/Recommend";
import { Product } from "./product/Product";

export const Home = () => {
  return (
    <>
      <Hero />
      <Card />
      <Recommend />
      <Product />
    </>
  );
};
