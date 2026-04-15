const pool = require("../config/db");

const getAllProducts = async () => {
  // Fetches all products, their category name, and their primary thumbnail image
  const query = `
    SELECT p.*, c.name AS category_name,
      (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = TRUE LIMIT 1) AS primary_image
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `;
  const [rows] = await pool.execute(query);
  return rows;
};

const getProductById = async (id) => {
  // 1. Fetch the main product data
  const [productRows] = await pool.execute(`SELECT * FROM products WHERE id = ?`, [id]);
  
  if (productRows.length === 0) return null;
  const product = productRows[0];

  // 2. Fetch all images for the carousel
  const [imageRows] = await pool.execute(
    `SELECT image_url, is_primary FROM product_images WHERE product_id = ?`, 
    [id]
  );
  product.images = imageRows;

  // 3. Fetch all specifications for the detail table
  const [specRows] = await pool.execute(
    `SELECT spec_key, spec_value FROM product_specifications WHERE product_id = ?`, 
    [id]
  );
  product.specifications = specRows;

  return product;
};

module.exports = {
  getAllProducts,
  getProductById
};