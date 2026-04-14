-- ============================================================
--  Flipkart Clone — Database Schema
--  Database: flipkart_clone
-- ============================================================

CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

-- ------------------------------------------------------------
-- 1. CATEGORIES
--    Every product belongs to one category.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 2. PRODUCTS
--    Core product information.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id               INT            AUTO_INCREMENT PRIMARY KEY,
  category_id      INT            NOT NULL,
  name             VARCHAR(255)   NOT NULL,
  description      TEXT,
  price            DECIMAL(10, 2) NOT NULL,
  mrp              DECIMAL(10, 2) NOT NULL,          -- original price (for discount %)
  stock            INT            NOT NULL DEFAULT 0,
  brand            VARCHAR(100),
  rating           DECIMAL(3, 2)  DEFAULT 0.00,      -- e.g. 4.35
  rating_count     INT            DEFAULT 0,
  created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_product_category FOREIGN KEY (category_id)
    REFERENCES categories(id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 3. PRODUCT IMAGES
--    One product can have multiple images (carousel).
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_images (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  product_id INT          NOT NULL,
  image_url  VARCHAR(500) NOT NULL,
  is_primary BOOLEAN      DEFAULT FALSE,   -- the thumbnail shown in listing

  CONSTRAINT fk_image_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 4. PRODUCT SPECIFICATIONS
--    Key-value pairs shown in the spec table on detail page.
--    e.g. ("RAM", "8 GB"), ("Battery", "5000 mAh")
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_specifications (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  product_id INT          NOT NULL,
  spec_key   VARCHAR(100) NOT NULL,
  spec_value VARCHAR(255) NOT NULL,

  CONSTRAINT fk_spec_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 5. USERS
--    Assignment says "assume a default user is logged in"
--    so we keep this simple — just one default user in seed.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  phone      VARCHAR(15),
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 6. CART ITEMS
--    Each row = one product in a user's cart.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
  id         INT       AUTO_INCREMENT PRIMARY KEY,
  user_id    INT       NOT NULL,
  product_id INT       NOT NULL,
  quantity   INT       NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_cart_user_product (user_id, product_id),  -- no duplicate rows

  CONSTRAINT fk_cart_user    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 7. ORDERS
--    One row per placed order.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id               INT            AUTO_INCREMENT PRIMARY KEY,
  user_id          INT            NOT NULL,
  total_amount     DECIMAL(10, 2) NOT NULL,
  status           ENUM('pending','confirmed','shipped','delivered','cancelled')
                                  DEFAULT 'confirmed',
  -- Shipping address (denormalised for simplicity — address can change later)
  shipping_name    VARCHAR(150)   NOT NULL,
  shipping_phone   VARCHAR(15)    NOT NULL,
  shipping_address VARCHAR(500)   NOT NULL,
  shipping_city    VARCHAR(100)   NOT NULL,
  shipping_state   VARCHAR(100)   NOT NULL,
  shipping_pincode VARCHAR(10)    NOT NULL,
  created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- 8. ORDER ITEMS
--    Snapshot of each product at the time of purchase.
--    We store price here so future price changes don't affect old orders.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id          INT            AUTO_INCREMENT PRIMARY KEY,
  order_id    INT            NOT NULL,
  product_id  INT            NOT NULL,
  product_name VARCHAR(255)  NOT NULL,   -- snapshot
  price       DECIMAL(10, 2) NOT NULL,   -- price at time of purchase
  quantity    INT            NOT NULL,

  CONSTRAINT fk_orderitem_order   FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  CONSTRAINT fk_orderitem_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);