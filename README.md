# Flipkart Clone

A Full-stack e-commerce application mimicking Flipkart's core features and design patterns.

---

## Table of Contents

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

## Project Overview

This project implements the complete core shopping flow expected in the assignment:

- Product discovery on a listing page.
- Product exploration on a detail page.
- Cart operations with quantity updates and totals.
- Checkout and order placement with shipping details.
- Order confirmation and order history tracking.

---

## Essential Features (Assignment Scope)

### 1. Product Listing Page

- Product grid layout with Flipkart-style cards.
- Search products by keyword.
- Filter products by category.

### 2. Product Detail Page

- Image carousel/gallery for product images.
- Product details with pricing and ratings.
- Add to Cart action.
- Buy Now action.

### 3. Shopping Cart

- View all cart items.
- Update product quantity.
- Remove cart items.
- Price details with subtotal and total amount.

### 4. Order Placement

- Checkout page with shipping address form.
- Order summary review before payment.
- Place order flow.
- Order confirmation page with generated order ID.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express.js, MySQL, mysql2 |
| Tooling | ESLint, PostCSS |

---

## Project Structure

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

## Features in Detail

### Product Catalog

- Fetches product data from backend APIs.
- Supports category navigation and keyword search.
- Displays image-rich cards with pricing information.

### Product Details Experience

- Dedicated product page for each item.
- Multi-image browsing.
- Quick conversion actions: Add to Cart and Buy Now.

### Cart and Pricing

- Real-time cart sync from backend.
- Quantity updates and item removal.
- Price summary with MRP, discount, fees, and final total.

### Checkout and Orders

- Shipping details collection with validation.
- Order creation via backend order APIs.
- Order confirmation view with order ID and summary.
- My Orders page for previously placed orders.

---

## Database

- Relational schema implemented in MySQL.
- Core tables: categories, products, product_images, product_specifications, users, cart_items, orders, order_items.
- SQL scripts are available in `server/db/schema.sql` and `server/db/seed.sql`.

---

## Setup and Running

### Prerequisites

- Node.js (LTS recommended)
- npm
- MySQL 8+

### 1. Install Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure Backend Environment

Create `server/.env` with the following values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=flipkart_clone
PORT=8080
```

### 3. Initialize Database

Run the following in MySQL:

```sql
SOURCE server/db/schema.sql;
SOURCE server/db/seed.sql;
```

Optional migration:

```sql
SOURCE server/db/migrations/2026-04-16_add_delivery_instructions.sql;
```

### 4. Start Backend Server

```bash
cd server
npm start
```

Backend base URL: `http://localhost:8080/api`

### 5. Start Frontend App

```bash
cd client
npm run dev
```

Frontend URL: `http://localhost:5173`

---

## API Overview

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

## Assumptions

- A default user is treated as logged in for cart and order flows.
- Prices and totals are represented in INR.
- Implementation focuses on assignment-required core functionality.

---

## Bonus Implemented

- Added a **My Orders** page where users can view previously placed orders along with order details.

