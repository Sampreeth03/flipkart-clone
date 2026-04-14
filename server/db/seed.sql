-- ============================================================
--  Flipkart Clone — Seed Data
--  Run AFTER schema.sql
-- ============================================================

USE flipkart_clone;

-- ------------------------------------------------------------
-- RESET DATA
-- ------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE product_specifications;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- CATEGORIES
-- ------------------------------------------------------------
INSERT INTO categories (name) VALUES
  ('Fashion'),
  ('Mobiles'),
  ('Beauty'),
  ('Electronics'),
  ('Home'),
  ('Appliances'),
  ('Toys'),
  ('Food & Health'),
  ('Auto Accessories'),
  ('Two Wheelers'),
  ('Sports'),
  ('Books'),
  ('Furniture');

-- ------------------------------------------------------------
-- DEFAULT USER  (id = 1, used everywhere as the logged-in user)
-- ------------------------------------------------------------
INSERT INTO users (name, email, phone) VALUES
  ('Demo User', 'demo@flipkart.com', '9999999999');

-- ------------------------------------------------------------
-- PRODUCTS
-- ------------------------------------------------------------
INSERT INTO products (category_id, name, description, price, mrp, stock, brand, rating, rating_count) VALUES
-- Fashion (1)
(1, 'Casual Shirts', 'Everyday cotton casual shirts for men.', 999.00, 1299.00, 120, 'FashionCo', 4.20, 3400),
(1, 'Denim Jeans', 'Slim fit denim jeans, stretchable fabric.', 1499.00, 1899.00, 90, 'DenimHub', 4.10, 2100),
(1, 'Women Kurta', 'Printed kurta with comfortable fit.', 1199.00, 1599.00, 110, 'EthnicWear', 4.25, 1850),
(1, 'Sports Sneakers', 'Lightweight sneakers for daily wear.', 2399.00, 2999.00, 70, 'Stride', 4.30, 920),
(1, 'Classic Hoodie', 'Fleece hoodie with kangaroo pocket.', 1799.00, 2199.00, 80, 'UrbanStyle', 4.15, 640),
(1, 'Summer Dress', 'Breathable fabric summer dress.', 1599.00, 2099.00, 75, 'Bloom', 4.18, 520),
(1, 'Leather Belt', 'Genuine leather belt with metal buckle.', 699.00, 999.00, 200, 'LeatherPro', 4.05, 410),
(1, 'Cotton T-Shirts', 'Pack of 2 cotton crew neck tees.', 799.00, 1099.00, 160, 'Basics', 4.12, 980),

-- Mobiles (2)
(2, 'Samsung Galaxy A55', '8GB RAM, 128GB storage, AMOLED display.', 29999.00, 35999.00, 60, 'Samsung', 4.35, 1500),
(2, 'Redmi Note 13', '120Hz AMOLED, 5000mAh battery.', 17999.00, 21999.00, 120, 'Xiaomi', 4.20, 2400),
(2, 'iPhone 14', 'A15 Bionic, 128GB, dual camera.', 55999.00, 64999.00, 40, 'Apple', 4.60, 3200),
(2, 'Realme Narzo 70', 'MediaTek Dimensity, 45W fast charge.', 15999.00, 19999.00, 90, 'Realme', 4.15, 1300),
(2, 'OnePlus Nord CE 4', '120Hz AMOLED, Snapdragon 7 Gen.', 24999.00, 28999.00, 75, 'OnePlus', 4.32, 980),
(2, 'Moto G84', 'P-OLED display, 5G ready.', 18999.00, 22999.00, 85, 'Motorola', 4.10, 860),
(2, 'Vivo T3', 'Dimensity chipset, 64MP camera.', 17999.00, 20999.00, 90, 'Vivo', 4.08, 740),
(2, 'POCO X6', 'Snapdragon 7s Gen 2, 67W charging.', 20999.00, 24999.00, 70, 'POCO', 4.22, 930),

-- Beauty (3)
(3, 'Matte Lipstick', 'Long lasting matte finish lipstick.', 499.00, 699.00, 200, 'GlamUp', 4.05, 1200),
(3, 'Herbal Face Wash', 'Gentle daily face wash with herbs.', 299.00, 399.00, 250, 'HerbalCare', 4.10, 1600),
(3, 'Vitamin C Serum', 'Brightening serum for daily use.', 899.00, 1199.00, 140, 'GlowLab', 4.20, 980),
(3, 'Sunscreen SPF50', 'Broad spectrum PA++++ sunscreen.', 649.00, 899.00, 180, 'SunShield', 4.15, 1340),
(3, 'Kajal Pencil', 'Smudge-proof black kajal.', 199.00, 299.00, 300, 'EyeLine', 4.08, 2100),
(3, 'Hair Dryer', '1200W compact hair dryer.', 1299.00, 1699.00, 90, 'StylePro', 4.12, 420),
(3, 'Perfume Spray', 'Fresh long-lasting fragrance.', 799.00, 1099.00, 160, 'Aroma', 4.18, 650),
(3, 'Moisturizer Cream', 'Deep hydration daily moisturizer.', 349.00, 499.00, 220, 'SoftSkin', 4.09, 870),

-- Electronics (4)
(4, 'Wireless Mouse', 'Ergonomic wireless mouse.', 599.00, 799.00, 150, 'TechMate', 4.10, 740),
(4, 'Mechanical Keyboard', 'Blue switches, RGB backlight.', 2599.00, 2999.00, 70, 'KeyPro', 4.25, 520),
(4, 'Bluetooth Speaker', 'Portable speaker with deep bass.', 1499.00, 1999.00, 130, 'SoundGo', 4.15, 910),
(4, 'Power Bank 20000mAh', 'Fast charging power bank.', 1299.00, 1699.00, 160, 'PowerMax', 4.20, 1100),
(4, 'Smart LED Bulb', 'WiFi bulb with app control.', 499.00, 699.00, 200, 'GlowTech', 4.05, 830),
(4, 'WiFi Router', 'Dual-band router with high speed.', 1899.00, 2299.00, 90, 'NetFast', 4.12, 640),
(4, 'USB-C Hub', '7-in-1 USB-C hub adapter.', 1199.00, 1599.00, 140, 'Portify', 4.08, 540),
(4, 'Noise Cancelling Earbuds', 'ANC true wireless earbuds.', 2299.00, 2799.00, 110, 'AudioBeat', 4.18, 720),

-- Home (5)
(5, 'Bedsheet Set', 'Cotton bedsheet with 2 pillow covers.', 899.00, 1199.00, 180, 'HomeEase', 4.12, 600),
(5, 'Wall Clock', 'Silent sweep wall clock.', 499.00, 699.00, 150, 'TickTock', 4.05, 520),
(5, 'Kitchen Storage Box', 'Set of 3 airtight containers.', 799.00, 1099.00, 130, 'KitchenPro', 4.10, 480),
(5, 'Floor Lamp', 'Modern floor lamp for living room.', 2499.00, 2999.00, 60, 'GlowHome', 4.20, 310),
(5, 'Curtain Set', '2 panels blackout curtains.', 1299.00, 1599.00, 80, 'Drape', 4.08, 290),
(5, 'Photo Frame', 'Wooden photo frame set.', 599.00, 899.00, 140, 'FrameIt', 4.06, 410),
(5, 'Cushion Covers', 'Pack of 5 cushion covers.', 499.00, 699.00, 170, 'Cozy', 4.07, 360),
(5, 'Aroma Diffuser', 'Ultrasonic aroma diffuser.', 1499.00, 1999.00, 90, 'AromaHome', 4.15, 270),

-- Appliances (6)
(6, 'Mixer Grinder', '750W mixer grinder with 3 jars.', 2999.00, 3499.00, 70, 'KitchenKing', 4.20, 520),
(6, 'Air Fryer', '4L air fryer with digital controls.', 4999.00, 5999.00, 55, 'FryLite', 4.25, 430),
(6, 'Microwave Oven', '20L convection microwave.', 6999.00, 7999.00, 40, 'HeatWave', 4.15, 320),
(6, 'Water Purifier', 'RO+UV water purifier.', 8999.00, 10999.00, 35, 'PureFlow', 4.30, 280),
(6, 'Vacuum Cleaner', 'Bagless vacuum cleaner.', 3499.00, 4299.00, 60, 'CleanMax', 4.10, 410),
(6, 'Washing Machine', '7kg top load washing machine.', 15999.00, 18999.00, 25, 'WashPro', 4.22, 210),
(6, 'Induction Cooktop', '2000W induction cooktop.', 2199.00, 2699.00, 80, 'CookMate', 4.12, 540),
(6, 'Electric Kettle', '1.5L stainless steel kettle.', 999.00, 1299.00, 120, 'BoilFast', 4.05, 620),

-- Toys (7)
(7, 'Building Blocks', 'Creative blocks set for kids.', 799.00, 999.00, 150, 'PlayFun', 4.15, 760),
(7, 'Remote Car', 'Rechargeable remote control car.', 999.00, 1299.00, 130, 'Speedy', 4.12, 690),
(7, 'Teddy Bear', 'Soft plush teddy bear.', 699.00, 899.00, 200, 'Cuddle', 4.18, 980),
(7, 'Puzzle Set', '500-piece puzzle set.', 599.00, 799.00, 140, 'PuzzlePro', 4.08, 560),
(7, 'Action Figure', 'Superhero action figure.', 499.00, 699.00, 190, 'HeroMax', 4.05, 430),
(7, 'Board Game', 'Family board game set.', 899.00, 1099.00, 120, 'GameOn', 4.10, 380),
(7, 'Doll House', 'Miniature doll house set.', 1499.00, 1899.00, 70, 'TinyHome', 4.14, 210),
(7, 'Toy Train', 'Battery operated toy train.', 799.00, 999.00, 110, 'TrackIt', 4.06, 300),

-- Food & Health (8)
(8, 'Almonds 500g', 'Premium quality almonds.', 499.00, 649.00, 200, 'NutriBox', 4.22, 1450),
(8, 'Protein Powder', 'Whey protein 1kg.', 2199.00, 2799.00, 90, 'FitFuel', 4.18, 820),
(8, 'Green Tea', 'Organic green tea 100 bags.', 399.00, 499.00, 160, 'TeaLeaf', 4.10, 600),
(8, 'Honey 1kg', 'Pure natural honey.', 599.00, 799.00, 140, 'BeePure', 4.12, 540),
(8, 'Multivitamin Tablets', 'Daily multivitamin pack.', 699.00, 899.00, 130, 'VitaPlus', 4.08, 490),
(8, 'Peanut Butter', 'Creamy peanut butter 1kg.', 449.00, 599.00, 150, 'NutriSpread', 4.15, 670),
(8, 'Oats 1kg', 'Whole grain oats.', 299.00, 399.00, 180, 'OatGood', 4.05, 720),
(8, 'Energy Bar Pack', 'Pack of 6 energy bars.', 349.00, 499.00, 200, 'EnergyGo', 4.09, 410),

-- Auto Accessories (9)
(9, 'Car Vacuum', 'Portable car vacuum cleaner.', 1499.00, 1899.00, 90, 'AutoCare', 4.12, 350),
(9, 'Bike Mobile Holder', 'Handlebar phone holder.', 399.00, 599.00, 160, 'RideSafe', 4.06, 520),
(9, 'Seat Cover Set', 'Full car seat cover set.', 2999.00, 3599.00, 50, 'SeatPro', 4.10, 270),
(9, 'Car Air Freshener', 'Long lasting car freshener.', 199.00, 299.00, 240, 'FreshRide', 4.02, 910),
(9, 'Car Charger', 'Dual USB car charger.', 499.00, 699.00, 190, 'ChargeIt', 4.08, 640),
(9, 'Helmet', 'ISI certified helmet.', 1299.00, 1799.00, 80, 'SafeRide', 4.18, 430),
(9, 'Car Wax Polish', 'Premium car wax polish.', 599.00, 799.00, 120, 'ShineX', 4.05, 280),
(9, 'Tire Inflator', 'Portable tire inflator.', 1999.00, 2499.00, 60, 'InflatePro', 4.15, 210),

-- Two Wheelers (10)
(10, 'Scooter Cover', 'Waterproof scooter cover.', 599.00, 799.00, 140, 'CoverIt', 4.06, 380),
(10, 'Riding Gloves', 'Protective riding gloves.', 899.00, 1199.00, 110, 'GripX', 4.12, 320),
(10, 'Bike Brake Pads', 'Durable brake pad set.', 699.00, 899.00, 130, 'BrakePro', 4.08, 260),
(10, 'Chain Lube', 'High performance chain lube.', 299.00, 399.00, 200, 'LubeX', 4.05, 400),
(10, 'Rear View Mirror', 'Universal bike mirror.', 499.00, 699.00, 150, 'MirrorMax', 4.07, 300),
(10, 'Bike Indicator', 'LED indicator set.', 599.00, 799.00, 120, 'BlinkIt', 4.06, 240),
(10, 'Bike Lock', 'Heavy duty bike lock.', 799.00, 999.00, 90, 'LockSafe', 4.14, 190),
(10, 'Riding Jacket', 'Protective riding jacket.', 2499.00, 2999.00, 50, 'RideGear', 4.18, 160),

-- Sports (11)
(11, 'Cricket Bat', 'Kashmir willow bat.', 1299.00, 1599.00, 90, 'Sporty', 4.10, 520),
(11, 'Football', 'Size 5 match football.', 699.00, 899.00, 140, 'KickPro', 4.08, 410),
(11, 'Badminton Racket', 'Lightweight racket.', 899.00, 1199.00, 110, 'Smash', 4.12, 350),
(11, 'Yoga Mat', '6mm non-slip yoga mat.', 499.00, 699.00, 180, 'FlexFit', 4.15, 640),
(11, 'Dumbbell Set', 'Pair of 5kg dumbbells.', 1499.00, 1899.00, 80, 'PowerMax', 4.20, 260),
(11, 'Cycling Helmet', 'Adjustable cycling helmet.', 1099.00, 1399.00, 70, 'CycleSafe', 4.11, 190),
(11, 'Tennis Balls', 'Pack of 3 tennis balls.', 299.00, 399.00, 200, 'Court', 4.04, 310),
(11, 'Skipping Rope', 'Speed skipping rope.', 199.00, 299.00, 220, 'SkipPro', 4.06, 420),

-- Books (12)
(12, 'Fiction Novel Set', 'Bestselling fiction collection.', 899.00, 1099.00, 120, 'BookVerse', 4.20, 340),
(12, 'Self Help Book', 'Motivational self help title.', 399.00, 499.00, 160, 'Inspire', 4.12, 280),
(12, 'Coding Interview Prep', 'DSA and interview guide.', 699.00, 899.00, 140, 'CodePath', 4.25, 510),
(12, 'Children Story Book', 'Illustrated story book.', 299.00, 399.00, 200, 'KidReads', 4.10, 420),
(12, 'Cookbook', 'Easy recipes cookbook.', 499.00, 649.00, 150, 'CookWell', 4.08, 240),
(12, 'History Book', 'World history overview.', 599.00, 799.00, 120, 'Histora', 4.09, 180),
(12, 'Science Encyclopedia', 'Comprehensive science guide.', 999.00, 1299.00, 80, 'SciWorld', 4.18, 140),
(12, 'Exam Guide', 'Competitive exam prep guide.', 549.00, 699.00, 130, 'ExamEdge', 4.12, 210),

-- Furniture (13)
(13, 'Office Chair', 'Ergonomic office chair.', 3999.00, 4999.00, 40, 'Comfort', 4.20, 260),
(13, 'Study Table', 'Compact study table.', 2999.00, 3599.00, 50, 'DeskPro', 4.15, 190),
(13, 'Bookshelf', '5-tier bookshelf.', 2499.00, 2999.00, 35, 'Shelfie', 4.12, 170),
(13, 'Shoe Rack', '3-tier shoe rack.', 1299.00, 1599.00, 70, 'RackIt', 4.08, 230),
(13, 'Coffee Table', 'Modern coffee table.', 2199.00, 2699.00, 45, 'HomeStyle', 4.14, 160),
(13, 'Dining Chair Set', 'Set of 2 dining chairs.', 3499.00, 4199.00, 30, 'SeatWell', 4.18, 120),
(13, 'Wardrobe', '2-door wardrobe.', 7999.00, 8999.00, 20, 'Wardro', 4.16, 90),
(13, 'Mattress', 'Queen size foam mattress.', 6999.00, 7999.00, 25, 'Sleepy', 4.22, 140);

-- ------------------------------------------------------------
-- PRODUCT IMAGES (one primary image per product)
-- ------------------------------------------------------------
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT
  p.id,
  'https://placehold.co/600x600/e5e7eb/111?text=' AS image_url,
  TRUE
FROM products p
JOIN categories c ON c.id = p.category_id;

-- ------------------------------------------------------------
-- PRODUCT SPECIFICATIONS
-- (Optional: left empty for now)
-- ------------------------------------------------------------