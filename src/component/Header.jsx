import React from "react";
import { FaShoppingCart, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ setSelectedCategory }) {
  const navigate = useNavigate();

  const categories = [
    "All",
    "Shirts",
    "Pants",
    "Accessories",
    "Mobiles",
    "Mobile Accessories",
  ];

  return (
    <>
      <div className="top-header">
        <h2 onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          NexCart
        </h2>

        <div className="right-icons">
          <FaBell className="icon" />
          <FaShoppingCart
            className="icon"
            onClick={() => navigate("/cart")}
          />
          <FaUser className="icon" />
        </div>
      </div>

      <div className="menu-bar">
        {categories.map((item, index) => (
          <span
            key={index}
            onClick={() => setSelectedCategory(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

export default Header;