const pool = require("../config/db");

const placeOrder = async (userId, shippingDetails, cartItems, totalAmount) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // 1. Create the Order record
    const [orderResult] = await connection.execute(
      `INSERT INTO orders (user_id, total_amount, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_pincode) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, totalAmount, shippingDetails.name, shippingDetails.phone, shippingDetails.address, shippingDetails.city, shippingDetails.state, shippingDetails.pincode]
    );
    const orderId = orderResult.insertId;

    // 2. Insert all Order Items (Snapshotting the price and name as per your excellent schema)
    for (const item of cartItems) {
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    // 3. Clear the user's cart
    await connection.execute(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getUserOrders = async (userId) => {
  const [orders] = await pool.execute(`SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
  return orders;
};

module.exports = { placeOrder, getUserOrders };