const orderService = require("../services/orderService");
const cartService = require("../services/cartService");
const { sendSuccess, sendError } = require("../utils/response");

const DEFAULT_USER_ID = 1;

const createOrder = async (req, res, next) => {
  try {
    const { shippingDetails } = req.body;
    
    // Fetch the user's cart to verify there are items and calculate the total securely on the backend
    const cartItems = await cartService.getCartByUserId(DEFAULT_USER_ID);
    
    if (cartItems.length === 0) {
      return sendError(res, "Cannot place order: Cart is empty", 400);
    }

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const orderId = await orderService.placeOrder(DEFAULT_USER_ID, shippingDetails, cartItems, totalAmount);

    return sendSuccess(res, { orderId }, "Order placed successfully", 201);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(DEFAULT_USER_ID);
    return sendSuccess(res, orders, "Orders fetched", 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders };