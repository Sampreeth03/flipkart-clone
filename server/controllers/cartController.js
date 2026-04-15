const cartService = require("../services/cartService");
const { sendSuccess, sendError } = require("../utils/response");

const DEFAULT_USER_ID = 1; // From your seed.sql

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCartByUserId(DEFAULT_USER_ID);
    
    // Calculate subtotal on the fly for the frontend
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return sendSuccess(res, { items: cart, total: cartTotal }, "Cart fetched", 200);
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return sendError(res, "Product ID is required", 400);

    await cartService.addItemToCart(DEFAULT_USER_ID, productId, quantity);
    return sendSuccess(res, null, "Item added to cart", 201);
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { id } = req.params; // this is the cart_item_id
    const { quantity } = req.body;
    
    if (quantity <= 0) {
      await cartService.removeCartItem(id);
      return sendSuccess(res, null, "Item removed from cart", 200);
    }

    await cartService.updateCartItemQuantity(id, quantity);
    return sendSuccess(res, null, "Cart updated", 200);
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cartService.removeCartItem(id);
    return sendSuccess(res, null, "Item removed", 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart };