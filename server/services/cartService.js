const pool = require("../config/db");

const getCartByUserId = async (userId) => {
  const query = `
    SELECT c.id AS cart_item_id, c.quantity, p.id AS product_id, p.name, p.price, p.mrp, p.brand, p.rating, p.rating_count,
      (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = TRUE LIMIT 1) AS image
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
};

const addItemToCart = async (userId, productId, quantity) => {
  // Insert once; do not increment if the item already exists
  const query = `
    INSERT IGNORE INTO cart_items (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  await pool.execute(query, [userId, productId, quantity]);
};

const updateCartItemQuantity = async (cartItemId, quantity) => {
  await pool.execute(`UPDATE cart_items SET quantity = ? WHERE id = ?`, [quantity, cartItemId]);
};

const removeCartItem = async (cartItemId) => {
  await pool.execute(`DELETE FROM cart_items WHERE id = ?`, [cartItemId]);
};

module.exports = { getCartByUserId, addItemToCart, updateCartItemQuantity, removeCartItem };