import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

const Chatbot = ({ setSelectedCategory }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your NexCart AI assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseInput = (text) => {
    const lowerText = text.toLowerCase().trim();
    
    // 1. GREETING
    if (["hi", "hello", "hey"].includes(lowerText)) {
      return {
        intent: "greeting",
        message: "Hello! How can I help you today?"
      };
    }

    // Category Mapping Logic
    let category = "";
    if (lowerText.includes("mobile accessor")) category = "mobile_accessory";
    else if (lowerText.includes("accessor")) category = "accessory";
    else if (lowerText.includes("shirt")) category = "shirt";
    else if (lowerText.includes("pant")) category = "pant";
    else if (lowerText.includes("mobile") || lowerText.includes("phone")) category = "mobile";

    // 4. PRODUCT RECOMMENDATION
    if (lowerText.includes("best") || lowerText.includes("suggest") || lowerText.includes("good") || lowerText.includes("which") && lowerText.includes("best")) {
      return {
        intent: "recommendation",
        category: category
      };
    }

    // 3. PRICE QUERY
    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much")) {
      return {
        intent: "price_query",
        category: category
      };
    }

    // 5. CATEGORY NAVIGATION
    if (lowerText === "show all" || (category && (lowerText === category || lowerText === category + "s"))) {
      return {
        intent: "category_view",
        category: category
      };
    }

    // 2. PRODUCT SEARCH
    if (category || lowerText.includes("show") || lowerText.includes("search") || lowerText.includes("find") || lowerText.includes("under") || lowerText.includes("above") || lowerText.includes("between")) {
      let minPrice = null;
      let maxPrice = null;
      
      // Price Extraction
      if (lowerText.includes("between")) {
        const prices = lowerText.match(/\d+/g);
        if (prices && prices.length >= 2) {
          minPrice = parseInt(prices[0]);
          maxPrice = parseInt(prices[1]);
        }
      } else if (lowerText.includes("under") || lowerText.includes("below") || lowerText.includes("less than")) {
        const price = lowerText.match(/\d+/);
        if (price) maxPrice = parseInt(price[0]);
      } else if (lowerText.includes("above") || lowerText.includes("over") || lowerText.includes("more than")) {
        const price = lowerText.match(/\d+/);
        if (price) minPrice = parseInt(price[0]);
      } else {
        const price = lowerText.match(/\d+/);
        if (price) maxPrice = parseInt(price[0]);
      }

      return {
        intent: "search",
        category,
        minPrice,
        maxPrice
      };
    }

    return { intent: "unknown" };
  };

  const handleAIResponse = (response) => {
    // If response is already an object (from our local simulation)
    const parsed = typeof response === "string" ? JSON.parse(response) : response;

    if (parsed.intent === "greeting") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: parsed.message }
      ]);
    } else if (parsed.intent === "search" || parsed.intent === "category_view") {
      // Trigger UI action (Map to existing state setter)
      if (parsed.category) {
        let mapped = "All";
        if (parsed.category === "shirt") mapped = "Shirts";
        else if (parsed.category === "pant") mapped = "Pants";
        else if (parsed.category === "mobile") mapped = "Mobiles";
        else if (parsed.category === "accessory") mapped = "Accessories";
        else if (parsed.category === "mobile_accessory") mapped = "Mobile Accessories";

        setSelectedCategory(mapped);
        navigate("/dashboard");
      }

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: parsed.intent === "category_view" ? `Navigating to ${parsed.category || "all products"}...` : `Showing results for ${parsed.category || "your search"}...` }
      ]);
    } else if (parsed.intent === "price_query") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `Checking current prices for ${parsed.category || "this product"}... You can see all prices on the dashboard.` }
      ]);
    } else if (parsed.intent === "recommendation") {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `I recommend our top-rated ${parsed.category || "products"}! You can explore the best deals on the dashboard.` }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, I didn't understand that." }
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const response = parseInput(input);
    
    setTimeout(() => {
      handleAIResponse(response);
    }, 600);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>NexCart Assistant</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.isJson ? (
                  <pre style={{ fontSize: "0.75rem", background: "#f8fafc", padding: "8px", borderRadius: "8px", margin: 0, overflowX: "auto" }}>
                    {JSON.stringify(msg.data, null, 2)}
                  </pre>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
