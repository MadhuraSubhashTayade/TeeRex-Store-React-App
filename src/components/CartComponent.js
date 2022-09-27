import React, { useEffect, useState } from "react";
import "../index.css";
import "../queries.css";
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";

const CartComponent = ({
  cartItems,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(cartItems.length);
  const calculateTotal = () => {
    const itemTotal = cartItems.map(
      (item) => item.product.price * item.quantity
    );
    const allTotal = itemTotal.reduce((acc, ele) => (acc += ele), 0);
    setTotal(allTotal);
    const count = cartItems.reduce((acc, ele) => (acc += ele.quantity), 0);
    setTotalItems(count);
  };
  useEffect(() => calculateTotal(), [cartItems]);

  return (
    <div className="cart-container">
      <div className="cart-left">
        {cartItems.map((item) => {
          const { product, quantity } = item;
          return (
            <section className="single-cart">
              {/* // 1st row */}
              <div className="cart-1">
                <div className="cart-img-container">
                  <img src={product.imageURL} alt="" />
                </div>
                <div className="cart-details">
                  <p className="cart-product-name">{product.name}</p>
                  <p className="cart-product-color">Color: {product.color}</p>
                  <p className="stock">In stock</p>
                </div>
                <div className="cart-product-price">
                  <span>Each</span>
                  <p>$ {product.price}</p>
                </div>
                <div className="qty-container">
                  <p>Quantity</p>
                  <span>
                    <GrAdd
                      className="plus-icon"
                      onClick={() => incrementQuantity(product.id)}
                    />
                    <strong>{quantity}</strong>
                    <GrSubtract
                      className="minus-icon"
                      onClick={() => decrementQuantity(product.id)}
                    />
                  </span>
                </div>
                <div className="cart-price">
                  <p>Price</p>
                  <p>$ {product.price * item.quantity}.00</p>
                </div>
              </div>

              {/* // 3rd row */}
              <div className="cart-3">
                <button onClick={() => removeFromCart(product)}>Delete</button>
              </div>

              {/* // 2nd row */}
            </section>
          );
        })}

        <div className="cart-2">
          <p>{totalItems} Items</p>
          <p>${total}.00</p>
        </div>
      </div>
      <div className="cart-right">
        {/* //row1 */}
        <div className="right-row-1">
          <p>Enter Promo Code</p>
          <input type="text" />
          <button>Submit</button>
        </div>
        {/* //row2 */}
        <div className="right-row-2">
          <div>
            <p>Shipping Cost</p>
            <p>123</p>
          </div>
          <div>
            <p>Discount</p>
            <p>30%</p>
          </div>
          <div>
            <p>Tax</p>
            <p>10.00</p>
          </div>
          <div>
            <p>Estimated Total</p>
            <p>$ {total}.99</p>
          </div>
        </div>
        <button className="right-row-3">Checkout</button>
      </div>
    </div>
  );
};

export default CartComponent;
