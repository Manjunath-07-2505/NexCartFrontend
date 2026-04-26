// import React, { useEffect, useState } from "react";
// import "./Cart.css";

// const CartPage = () => {

// const [cartItems, setCartItems] = useState([]);
// const [subtotal, setSubtotal] = useState(0);

// const token = localStorage.getItem("token");

// // Fetch cart items
// const fetchCartItems = async () => {
// try {


//   const response = await fetch(
//     "http://localhost:9090/api/cart/items",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch cart items");
//   }

//   const data = await response.json();

//   const items = data?.cart?.products || [];

//   setCartItems(items);

// } catch (error) {

//   console.error("Cart fetch error:", error);
//   setCartItems([]);

// }


// };

// useEffect(() => {
// fetchCartItems();
// }, []);

// // Calculate subtotal automatically
// useEffect(() => {

// const total = cartItems.reduce((sum, item) => {

//   const price = Number(item.price_per_unit) || 0;
//   const quantity = Number(item.quantity) || 0;

//   return sum + price * quantity;

// }, 0);

// setSubtotal(total);


// }, [cartItems]);

// // Update quantity
// const updateQuantity = async (productId, newQty) => {


// if (newQty <= 0) {
//   deleteItem(productId);
//   return;
// }

// try {

//   const response = await fetch(
//     "http://localhost:9090/api/cart/update",
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         productId: productId,
//         quantity: newQty
//       })
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Update failed");
//   }

//   setCartItems(prev =>
//     prev.map(item =>
//       item.product_id === productId
//         ? { ...item, quantity: newQty }
//         : item
//     )
//   );

// } catch (error) {

//   console.error("Update error:", error);

// }


// };

// // Delete item
// const deleteItem = async (productId) => {


// try {

//   const response = await fetch(
//     "http://localhost:9090/api/cart/delete",
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         productId: productId
//       })
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Delete failed");
//   }

//   setCartItems(prev =>
//     prev.filter(item => item.product_id !== productId)
//   );

// } catch (error) {

//   console.error("Delete error:", error);

// }


// };

// return (


// <div className="cart-container">

//   <h2 className="cart-title">My Cart</h2>

//   {cartItems.length === 0 ? (
//     <p>Cart is empty</p>
//   ) : (
//     <>
//       {cartItems.map(item => {

//         const price = Number(item.price_per_unit) || 0;
//         const quantity = Number(item.quantity) || 0;
//         const total = price * quantity;

//         const handlePayment = async () => {
//   try {
//     // Prepare cart items for backend
//     const formattedItems = cartItems.map(item => ({
//       productId: item.product_id,
//       quantity: item.quantity,
//       price: item.price_per_unit
//     }));

//     // Call backend create order API
//     const response = await fetch(
//       "http://localhost:9090/api/payment/create",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}` // optional (you can remove if auth disabled)
//         },
//         body: JSON.stringify({
//           totalAmount: subtotal + 30,
//           cartItems: formattedItems
//         })
//       }
//     );

//     const order = await response.json();

//     console.log("Order Response:", order);

//     // Razorpay options
//     const options = {
//       key: "rzp_test_LqWBBDbgwot5lh",
//       amount: order.amount,
//       currency: order.currency,
//       name: "NexCart",
//       description: "Order Payment",
//       order_id: order.id,

//       handler: async function (response) {
//         console.log("Payment Success:", response);

//         // Verify payment
//         await fetch("http://localhost:9090/api/payment/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}` // optional
//           },
//           body: JSON.stringify({
//             razorpayOrderId: response.razorpay_order_id,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpaySignature: response.razorpay_signature
//           })
//         });

//         alert("Payment Successful ✅");
//         fetchCartItems(); // refresh cart
//       },

//       prefill: {
//         name: "Customer",
//         email: "customer@gmail.com"
//       },

//       theme: {
//         color: "#3399cc"
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (error) {
//     console.error("Payment Error:", error);
//     alert("Payment Failed ❌");
//   }
// };
//         return (

//           <div key={item.product_id} className="cart-card">

//             <img
//               src={item.image_url}
//               alt={item.name}
//               className="cart-image"
//             />

//             <div className="cart-details">

//               <h3>{item.name}</h3>

//               <p>Price: ₹{price}</p>

//               <div className="qty-controls">

//                 <button
//                   onClick={() =>
//                     updateQuantity(item.product_id, quantity - 1)
//                   }
//                 >
//                   -
//                 </button>

//                 <span>{quantity}</span>

//                 <button
//                   onClick={() =>
//                     updateQuantity(item.product_id, quantity + 1)
//                   }
//                 >
//                   +
//                 </button>

//               </div>

//               <p>Total: ₹{total}</p>

//             </div>

//             <button
//               className="delete-btn"
//               onClick={() => deleteItem(item.product_id)}
//             >
//               Remove
//             </button>

//           </div>

//         );

//       })}

//       <div className="cart-summary">

//   <div className="row">
//     <span>Subtotal</span>
//     <span>₹ {subtotal.toFixed(2)}</span>
//   </div>

//   <div className="row">
//     <span>Delivery</span>
//     <span>₹ 30</span>
//   </div>

//   <hr/>

//   <div className="total">
//     <span>Total</span>
//     <span>₹ {(subtotal + 30).toFixed(2)}</span>
//   </div>

//   <button className="checkout-btn">
//     Pay ₹ {(subtotal + 30).toFixed(2)}
//   </button>

// </div>
//     </>
//   )}

// </div>


// );
// };

// export default CartPage;
import React, { useEffect, useState } from "react";
import "./Cart.css";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/cart/items",
        {
          method: "GET",
          headers: {
           Authorization: "Bearer " + token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      const items = data?.cart?.products || [];

      setCartItems(items);

    } catch (error) {
      console.error("Cart fetch error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate subtotal
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.price_per_unit) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    setSubtotal(total);
  }, [cartItems]);

  // Update quantity
  const updateQuantity = async (productId, newQty) => {

    if (newQty <= 0) {
      deleteItem(productId);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:9090/api/cart/update",
        {
         method: "PUT",
headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
},
          body: JSON.stringify({
            productId: productId,
            quantity: newQty
          })
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setCartItems(prev =>
        prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );

    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Delete item
  const deleteItem = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/cart/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            productId: productId
          })
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setCartItems(prev =>
        prev.filter(item => item.product_id !== productId)
      );

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ PAYMENT FUNCTION (FIXED)
  const handlePayment = async () => {
    try {
      console.log("PAY CLICKED");

      if (cartItems.length === 0) {
        alert("Your cart is empty! 🛒");
        return;
      }

      const formattedItems = cartItems.map(item => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price_per_unit
      }));

      const response = await fetch(
        "http://localhost:9090/api/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            totalAmount: subtotal + 30,
            cartItems: formattedItems
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Order creation failed");
      }

      const order = await response.json();
      console.log("Order Received:", order);

      if (!order || !order.id) {
        alert("Order ID missing ❌");
        return;
      }

      const options = {
        key: "rzp_test_LqWBBDbgwot5lh",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "NexCart",
        description: "Order Payment",
        prefill: {
          name: "Customer",
          email: "customer@gmail.com"
        },
        handler: async function (response) {
          console.log("Payment Success Callback:", response);

          try {
            const verifyRes = await fetch("http://localhost:9090/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            if (verifyRes.ok) {
              alert("Payment Successful ✅");
              fetchCartItems();
            } else {
              const errorText = await verifyRes.text();
              console.error("Verification failed:", errorText);
              alert("Payment Verification Failed ❌");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Payment Verification Error ❌");
          }
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed: " + error.message + " ❌");
    }
  };

  return (
    <div className="cart-container">

      <h2 className="cart-title">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => {

            const price = Number(item.price_per_unit) || 0;
            const quantity = Number(item.quantity) || 0;
            const total = price * quantity;

            return (
              <div key={item.product_id} className="cart-card">

                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>Price: ₹{price}</p>

                  <div className="qty-controls">

                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, quantity + 1)
                      }
                    >
                      +
                    </button>

                  </div>

                  <p>Total: ₹{total}</p>

                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.product_id)}
                >
                  Remove
                </button>

              </div>
            );

          })}

          <div className="cart-summary">

            <div className="row">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Delivery</span>
              <span>₹ 30</span>
            </div>

            <hr/>

            <div className="total">
              <span>Total</span>
              <span>₹ {(subtotal + 30).toFixed(2)}</span>
            </div>

            {/* ✅ FIXED BUTTON */}
            <button className="checkout-btn" onClick={handlePayment}>
              Pay ₹ {(subtotal + 30).toFixed(2)}
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default CartPage;
