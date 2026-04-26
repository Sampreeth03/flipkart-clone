# 🛒 Flipkart Clone

A full-stack e-commerce application built as the Scaler SDE Intern Fullstack Assignment. This project implements a complete shopping flow with product discovery, cart management, checkout, and order tracking.

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Essential Features](#essential-features-assignment-scope)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Features in Detail](#features-in-detail)
6. [Database](#database)
7. [Setup and Running](#setup-and-running)
8. [API Overview](#api-overview)
9. [Assumptions](#assumptions)
10. [Bonus Implemented](#bonus-implemented)

---

## 🎯 Project Overview

This project implements the complete core shopping flow expected in the assignment:

- 🔍 **Product Discovery** — Browse products with search and category filtering
- 📦 **Product Details** — Explore items with image gallery and specifications
- 🛍️ **Cart Management** — Add, update quantities, and remove items
- 💳 **Checkout Flow** — Provide shipping details and place orders
- ✅ **Order Confirmation** — View order history and tracking

---

## ✨ Essential Features (Assignment Scope)

### 1️⃣ Product Listing Page

- Product grid layout with Flipkart-style cards.
- Search products by keyword.
- Filter products by category.

### 2️⃣ Product Detail Page

- Image carousel/gallery for product images.
- Product details with pricing and ratings.
- Add to Cart action.
- Buy Now action.

### 3️⃣ Shopping Cart

- View all cart items.
- Update product quantity.
- Remove cart items.
- Price details with subtotal and total amount.

### 4️⃣ Order Placement

- Checkout page with shipping address form.
- Order summary review before payment.
- Place order flow.
- Order confirmation page with generated order ID.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, React Router, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, MySQL, mysql2 |
| **Tooling** | ESLint, PostCSS |

---

## 📂 Project Structure

```text
flipkart-clone/
  client/
    src/
      components/   # Reusable UI blocks (header, category bar, grid, sliders, footer)
      pages/        # Route-level pages (home, cart, checkout, product details, orders)
      assets/       # Images and static UI resources
      utils/        # Frontend utility helpers
  server/
    config/         # Database connection configuration
    controllers/    # Request handlers
    routes/         # API route definitions
    services/       # Business logic and DB queries
    db/
      schema.sql    # Database schema
      seed.sql      # Seed data
      migrations/   # SQL migrations
```

---

## 🎨 Features in Detail

### 📱 Product Catalog

- Fetches product data from backend APIs.
- Supports category navigation and keyword search.
- Displays image-rich cards with pricing information.

### 🖼️ Product Details Experience

- Dedicated product page for each item.
- Multi-image browsing.
- Quick conversion actions: Add to Cart and Buy Now.

### 💰 Cart and Pricing

- Real-time cart sync from backend.
- Quantity updates and item removal.
- Price summary with MRP, discount, fees, and final total.

### 🚚 Checkout and Orders

- Shipping details collection with validation.
- Order creation via backend order APIs.
- Order confirmation view with order ID and summary.
- My Orders page for previously placed orders.

---

## 🗄️ Database

- Relational schema implemented in MySQL.
- **Core tables:** categories, products, product_images, product_specifications, users, cart_items, orders, order_items.
- SQL scripts available in:
  - `server/db/schema.sql` — Schema initialization
  - `server/db/seed.sql` — Sample data
  - `server/db/migrations/` — Future migrations

---

## 🚀 Setup and Running

### ✅ Prerequisites

```
✓ Node.js (LTS recommended)
✓ npm
✓ MySQL 8+
```

---

### 📋 Installation Steps

#### Step 1: Install Dependencies

Navigate to both folders and install packages:

```bash
# Backend
cd server
npm install

# Frontend  
cd ../client
npm install
```

#### Step 2: Configure Environment

Create `server/.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=flipkart_clone
PORT=8080
```

#### Step 3: Initialize Database

Open MySQL and run:

```sql
SOURCE server/db/schema.sql;
SOURCE server/db/seed.sql;
```

Optional (for delivery instructions):

```sql
SOURCE server/db/migrations/2026-04-16_add_delivery_instructions.sql;
```

#### Step 4: Start Backend Server

```bash
cd server
npm start
```

Backend runs at: `http://localhost:8080/api`

#### Step 5: Start Frontend App

```bash
cd client
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch single product details |
| GET | `/api/cart` | Fetch cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update cart item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | Fetch user orders |
| GET | `/api/categories` | Fetch all categories |
| GET | `/` | API health check |

---

## 💡 Assumptions

- 👤 Default user is logged in for all cart and order operations
- 💵 All prices and totals displayed in **INR** (Indian Rupees)
- 📌 Stock tracking enabled — inventory deducts on order placement
- ✅ Implementation focuses on core assignment requirements

---

## 🎁 Bonus Implemented

### My Orders Feature

✨ Users can view their complete order history with:
- Order ID and timestamps
- Item details and pricing
- Shipping address and status
- Order timeline tracking

---

## 📧 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

