import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsCartDash, BsCartDashFill } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
import "../queries.css";

let activeStyle = {
  textDecoration: "none",
  display: "block",
  margin: "0.1vh 0.5vw",
  padding: "0.4%",
  color: "#000",
};
let style = {
  textDecoration: "none",
  display: "block",
  margin: "0.1vh 0.5vw",
  padding: "0.45%",
  color: "rgba(0,0,0,0.5)",
};

const Header = ({ cartCount }) => {
  return (
    <div className="header-container">
      <div className="header-title">
        <NavLink to="/" className="header-icon-container">
          <AiOutlineAppstore className="shop-icon" />
        </NavLink>
        <h4 className="shop-title">TeeRex Store</h4>
      </div>
      <nav className="header-nav">
        <ul className="header-links">
          <li className="header-link first">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : style)}
              to="/"
              end
            >
              Products
            </NavLink>
          </li>
          <li className="header-link">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : style)}
              to="/cart"
            >
              {cartCount > 0 ? (
                <BsCartDashFill className="cart-icon" />
              ) : (
                <BsCartDash className="cart-icon" />
              )}
            </NavLink>
            {cartCount > 0 ? <div className="round">{cartCount}</div> : ""}
          </li>
        </ul>
        <Outlet />
      </nav>
    </div>
  );
};

export default Header;
