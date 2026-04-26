import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // 🔥 UPDATED ADD TO CART (REAL BACKEND CALL)
  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:9090/api/cart/add",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart ✅");

    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add to cart ❌");
    }
  };

  const getCategory = (product) => {
    const name = product.name.toLowerCase();

    if (name.includes("shirt")) return "Shirts";
    if (name.includes("pant")) return "Pants";
    if (name.includes("mobile accessory")) return "Mobile Accessories";
    if (name.includes("mobile")) return "Mobiles";

    if (
      name.includes("tv") ||
      name.includes("speaker") ||
      name.includes("dslr") ||
      name.includes("laptop")
    )
      return "Accessories";

    return "Others";
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => getCategory(product) === selectedCategory
        );

  return (
    <div className="dashboard-container">
      <div className="content">
        <h2>Welcome {user?.name || "User"}</h2>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.product_id} className="product-card">
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "https://via.placeholder.com/200"
                  }
                  alt={product.name}
                />

                <h4>{product.name}</h4>
                <p className="price">₹ {product.price}</p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(product.product_id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "18px" }}>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;