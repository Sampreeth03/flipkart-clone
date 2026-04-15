const pool = require("../config/db");

const placeOrder = async (userId, shippingDetails, cartItems, totalAmount) => {
  const connection = await pool.getConnection();
  const address = shippingDetails.address || [
    shippingDetails.addressLine1,
    shippingDetails.addressLine2,
    shippingDetails.landmark,
  ].filter(Boolean).join(', ');
  const addressType = shippingDetails.addressType || 'HOME';

  const ensureSufficientStock = async () => {
    for (const item of cartItems) {
      const [productRows] = await connection.execute(
        `SELECT id, name, stock FROM products WHERE id = ? FOR UPDATE`,
        [item.product_id]
      );

      if (productRows.length === 0) {
        const error = new Error(`Product with id ${item.product_id} not found.`);
        error.statusCode = 404;
        throw error;
      }

      const product = productRows[0];
      const requestedQty = Number(item.quantity || 0);

      if (product.stock < requestedQty) {
        const error = new Error(
          `Insufficient stock for ${product.name}. Only ${product.stock} item(s) left.`
        );
        error.statusCode = 400;
        throw error;
      }
    }
  };

  const deductStock = async () => {
    for (const item of cartItems) {
      await connection.execute(
        `UPDATE products SET stock = stock - ? WHERE id = ?`,
        [item.quantity, item.product_id]
      );
    }
  };
  
  try {
    await connection.beginTransaction();

    // Lock products in the cart and ensure enough inventory exists.
    await ensureSufficientStock();

    // 1. Create the Order record
    let orderResult;
    try {
      [orderResult] = await connection.execute(
        `INSERT INTO orders (
          user_id,
          total_amount,
          shipping_name,
          shipping_phone,
          shipping_alt_phone,
          shipping_address_line1,
          shipping_address_line2,
          shipping_landmark,
          shipping_address_type,
          shipping_address,
          shipping_city,
          shipping_state,
          shipping_pincode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          totalAmount,
          shippingDetails.name,
          shippingDetails.phone,
          shippingDetails.altPhone || null,
          shippingDetails.addressLine1,
          shippingDetails.addressLine2 || null,
          shippingDetails.landmark || null,
          addressType,
          address,
          shippingDetails.city,
          shippingDetails.state,
          shippingDetails.pincode,
        ]
      );
    } catch (error) {
      if (error && error.code === 'ER_BAD_FIELD_ERROR') {
        [orderResult] = await connection.execute(
          `INSERT INTO orders (
            user_id,
            total_amount,
            shipping_name,
            shipping_phone,
            shipping_address,
            shipping_city,
            shipping_state,
            shipping_pincode
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            totalAmount,
            shippingDetails.name,
            shippingDetails.phone,
            address,
            shippingDetails.city,
            shippingDetails.state,
            shippingDetails.pincode,
          ]
        );
      } else {
        throw error;
      }
    }
    const orderId = orderResult.insertId;

    // 2. Insert all Order Items (Snapshotting the price and name as per your excellent schema)
    for (const item of cartItems) {
      await connection.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    // 3. Deduct inventory now that order items are confirmed.
    await deductStock();

    // 4. Clear the user's cart
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
  const [orders] = await pool.execute(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );

  if (orders.length === 0) return [];

  const orderIds = orders.map((order) => order.id);
  const placeholders = orderIds.map(() => '?').join(',');

  const [items] = await pool.execute(
    `SELECT
      oi.order_id,
      oi.product_id,
      oi.product_name,
      oi.price,
      oi.quantity,
      p.brand,
      pi.image_url
    FROM order_items oi
    LEFT JOIN products p ON p.id = oi.product_id
    LEFT JOIN product_images pi ON pi.product_id = oi.product_id AND pi.is_primary = TRUE
    WHERE oi.order_id IN (${placeholders})`,
    orderIds
  );

  const itemsByOrder = items.reduce((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = [];
    }
    acc[item.order_id].push(item);
    return acc;
  }, {});

  return orders.map((order) => ({
    ...order,
    items: itemsByOrder[order.id] || [],
  }));
};

module.exports = { placeOrder, getUserOrders };