import "../index.css";
import "../queries.css";
import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ products, addToCart }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Products;
