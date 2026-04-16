-- Add delivery instruction fields to orders table
ALTER TABLE orders
  ADD COLUMN shipping_alt_phone VARCHAR(15) NULL AFTER shipping_phone,
  ADD COLUMN shipping_address_line1 VARCHAR(255) NOT NULL AFTER shipping_alt_phone,
  ADD COLUMN shipping_address_line2 VARCHAR(255) NULL AFTER shipping_address_line1,
  ADD COLUMN shipping_landmark VARCHAR(255) NULL AFTER shipping_address_line2,
  ADD COLUMN shipping_address_type ENUM('HOME','WORK') DEFAULT 'HOME' AFTER shipping_landmark;
