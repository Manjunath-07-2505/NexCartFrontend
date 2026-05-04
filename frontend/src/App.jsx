import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Cart from "./component/Cart";
import Header from "./component/Header";
import Chatbot from "./component/Chatbot";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <>
              <Header setSelectedCategory={setSelectedCategory} />
              <Dashboard selectedCategory={selectedCategory} />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Header setSelectedCategory={setSelectedCategory} />
              <Cart />
            </>
          }
        />
      </Routes>
      <Chatbot setSelectedCategory={setSelectedCategory} />
    </>
  );
}

export default App;