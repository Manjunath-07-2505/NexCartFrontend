# NexCart - Full Stack E-Commerce Application

NexCart is a modern e-commerce platform built with a React frontend and a Spring Boot backend. It features a secure authentication system, product management, shopping cart functionality, and order processing.

## 🚀 Project Structure

The project is organized as a monorepo:

- **`/frontend`**: React application built with Vite.
- **`/backend`**: Spring Boot application (Java).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Styling**: CSS3 (Vanilla)
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **Database**: JPA / Hibernate (MySQL/PostgreSQL compatible)
- **Build Tool**: Maven

---

## ⚙️ How the Application Works

### 1. Authentication Flow
- **Registration**: Users create an account via the `Register` component. The frontend sends user details to `/auth/register`.
- **Login**: Users authenticate at `/auth/login`. The backend validates credentials and returns a **JWT Token**.
- **Security**: The JWT is stored in the browser (usually `localStorage`). Every subsequent request to protected routes (like cart or orders) includes this token in the `Authorization` header.

### 2. Product Management
- Users can browse products on the **Dashboard**.
- The frontend fetches product data from the `/products` API.
- Search and category filtering are handled via the `ProductController`.

### 3. Shopping Cart
- Users can add products to their cart.
- The **Cart** state is synchronized with the backend via the `CartController`.
- Users can increase/decrease quantities or remove items directly from the UI.

### 4. Order & Payment
- Once the user is ready to checkout, an order is created via the `OrderController`.
- The `PaymentController` handles the transaction logic (simulated or integrated with a gateway).
- Successful orders are saved with an `ORDERED` status.

---

## 🔄 Application Flow (Step-by-Step)

1.  **User Entry**: User lands on the Login/Register page.
2.  **Auth**: User logs in -> Token received -> Redirect to Dashboard.
3.  **Browsing**: Dashboard fetches all products -> User views product details.
4.  **Cart Actions**: User clicks "Add to Cart" -> Frontend calls `POST /cart/add` -> UI updates cart count.
5.  **Checkout**: User goes to `/cart` -> Clicks "Checkout" -> Order is initialized.
6.  **Payment**: User enters payment info -> Backend processes payment -> Order confirmed.
7.  **Profile/Orders**: User can view their past orders and profile details.

---

## 🏃 How to Run Locally

### Prerequisites
- Node.js (v18+)
- JDK 17 or higher
- Maven

### Installation
1. Clone the repository.
2. Install frontend dependencies:
   ```bash
   npm run install:all
   ```

### Running the Apps
You can start both services from the root directory:

- **Start Frontend**: `npm run dev:frontend` (Runs on `http://localhost:5173`)
- **Start Backend**: `npm run dev:backend` (Runs on `http://localhost:8080`)

---

## 📂 Key Directory Map

### Backend (`/backend/src/main/java/com/example/demo`)
- `controller/`: REST API Endpoints.
- `entity/`: Database models (User, Product, Order).
- `repository/`: Data access layer.
- `service/`: Business logic.
- `security/`: JWT and Security configuration.

### Frontend (`/frontend/src`)
- `component/`: Reusable UI parts (Header, Footer, Cart).
- `assets/`: Images and static files.
- `App.jsx`: Main application logic.
- `Routes.jsx`: Navigation configuration.

---

## 📝 License
This project is for educational purposes as part of the NexCart development series.
