# NexCart - Full-Stack Payment Integration

NexCart is a modern e-commerce application featuring a seamless checkout experience integrated with **Razorpay**.

---

## 🚀 How to Run the Project

### 1. Backend (Spring Boot)
The backend handles order creation, database persistence, and payment verification.

1.  **Database Setup**:
    *   Ensure **MySQL** is running.
    *   Create a database named `sales_savy`.
    *   Update `src/main/resources/application.properties` with your MySQL username and password.
2.  **Razorpay Configuration**:
    *   Ensure your Razorpay `key_id` and `key_secret` are correctly set in `application.properties`.
3.  **Launch**:
    ```bash
    mvn spring-boot:run
    ```
    *The server will start on `http://localhost:9090`.*

### 2. Frontend (React + Vite)
The frontend provides the user interface and handles the Razorpay Checkout popup.

1.  **Installation**:
    ```bash
    npm install
    ```
2.  **Launch**:
    ```bash
    npm run dev
    ```
    *The app will be available at `http://localhost:5173`.*

---

## 🛠️ Payment Workflow

The integration follows a secure, dual-phase workflow:

### Phase 1: Order Creation
1.  **Trigger**: User clicks the **"Pay"** button in the Cart.
2.  **Request**: Frontend sends a `POST` request to `/api/payment/create` containing:
    *   `totalAmount` (Subtotal + Delivery).
    *   `cartItems` (Product IDs, quantities, and prices).
    *   `Authorization` header (JWT Token).
3.  **Backend Action**:
    *   Validates the user's JWT.
    *   Calls the **Razorpay API** to create a unique `order_id`.
    *   Saves the Order in the database with status `PENDING`.
    *   Saves the specific `OrderItems` linked to this order.
4.  **Response**: Returns the `order_id`, `amount`, and `currency` to the frontend.

### Phase 2: Payment & Verification
1.  **Checkout**: Frontend opens the **Razorpay Checkout** popup using the returned `order_id`.
2.  **Payment**: User enters payment details (Card, UPI, etc.) and completes the transaction.
3.  **Callback**: Razorpay returns a `payment_id` and a cryptographic `signature`.
4.  **Verification**: Frontend sends these credentials to `/api/payment/verify`.
5.  **Backend Action**:
    *   Verifies the `signature` using the `key_secret` to prevent tampering.
    *   Updates Order status to `SUCCESS`.
    *   Clears the user's shopping cart.
6.  **Completion**: Frontend displays a "Payment Successful" alert and refreshes the cart view.

---

## 🔒 Security Features
*   **Signature Verification**: Payments are never "trusted" blindly; they are cryptographically verified on the server.
*   **JWT Protection**: All payment endpoints require a valid Bearer token.
*   **Transactional Integrity**: Orders and Cart clearing are handled within database transactions.
