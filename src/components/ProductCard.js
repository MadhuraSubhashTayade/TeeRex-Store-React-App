import React from "react";
import "../index.css";
import "../queries.css";
import { AiOutlineMan, AiOutlineExclamationCircle } from "react-icons/ai";
import { MdInvertColors } from "react-icons/md";

const ProductCard = ({ product, addToCart }) => {
  const { name, price, imageURL, gender, color, type } = product;
  return (
    <div className="product-container">
      <div className="product-img">
        <img src={imageURL} alt="" />
      </div>
      <div className="product-content">
        <p className="price">${price}</p>
        <h3 className="name">{name}</h3>
        <ul className="product-attributes">
          <li className="product-attr">
            <AiOutlineMan className="product-icon" />
            <span>
              For <strong>{gender}</strong>
            </span>
          </li>
          <li className="product-attr">
            <AiOutlineExclamationCircle className="product-icon" />
            <span>
              <strong>{type}</strong> Type
            </span>
          </li>
          <li className="product-attr">
            <MdInvertColors className="product-icon" />
            <span>
              Color <strong>{color}</strong>
            </span>
          </li>
        </ul>
        <button className="btn-cart" onClick={() => addToCart(product)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
