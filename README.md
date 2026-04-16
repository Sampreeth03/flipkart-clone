# Flipkart Clone

A full-stack Flipkart-style e-commerce clone with a React/Vite frontend and a Node/Express + MySQL backend.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MySQL (mysql2)
- Tooling: ESLint, PostCSS

## Project Structure
- client/ - React frontend
- server/ - Express API + MySQL integration

## Setup Instructions

### 1) Clone and install dependencies
```bash
# from repo root
cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables
Create server/.env (or use the existing one) with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=flipkart_clone
```

### 3) Set up the database
Run the schema and seed scripts in MySQL:
```sql
SOURCE server/db/schema.sql;
SOURCE server/db/seed.sql;
```

If you want delivery instruction fields, also run:
```sql
SOURCE server/db/migrations/2026-04-16_add_delivery_instructions.sql;
```

### 4) Start the server
```bash
cd server
npm start
```
The API runs on http://localhost:8080 by default.

### 5) Start the client
```bash
cd client
npm run dev
```
The app runs on http://localhost:5173 by default.

## Notes
- Orders are created via POST /api/orders and stored in the orders + order_items tables.
- The My Orders page pulls data from GET /api/orders.

