import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasItems = cartItems.length > 0;

  const priceSummary = useMemo(() => {
    const mrp = cartItems.reduce((sum, item) => sum + (Number(item.mrp) || 0) * (item.quantity || 0), 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 0);
    const fees = 7;
    const discount = Math.max(0, mrp - subtotal);
    const total = subtotal + fees;
    const savings = Math.max(0, discount);

    return { mrp, fees, discount, total, savings };
  }, [cartItems]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cart`);
      const items = response?.data?.data?.items || [];
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener('cart-updated', fetchCart);
    return () => window.removeEventListener('cart-updated', fetchCart);
  }, []);

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await axios.put(`${apiUrl}/cart/${cartItemId}`, { quantity });
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`${apiUrl}/cart/${cartItemId}`);
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="bg-[#f1f3f6] w-full py-4">
      <div className="max-w-[1320px] mx-auto flex gap-4">
        <div className="flex-1">
          {loading ? (
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center text-gray-600 font-semibold">
              Loading cart...
            </div>
          ) : hasItems ? (
            <>
              <div className="bg-white rounded-sm border border-gray-200 px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-700 font-medium">Deliver to: J Siva Sampreeth, 517541</div>
                  <div className="text-xs text-gray-500">Academic Block, IIIT Sricity, 630 Gyan Marg Circle, Sricity</div>
                </div>
                <button className="border border-gray-200 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
                  Change
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cart_item_id} className="bg-white rounded-sm border border-gray-200">
                    <div className="p-4 flex gap-4">
                      <div className="w-[110px]">
                        <div className="w-[110px] h-[140px] bg-[#f1f3f6] rounded-sm overflow-hidden flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = 'https://placehold.co/200x260/e5e7eb/111?text=';
                            }}
                          />
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-600">Qty:</span>
                          <select
                            className="border border-gray-300 rounded text-xs px-2 py-1 bg-white"
                            value={item.quantity}
                            onChange={(event) => handleQuantityChange(item.cart_item_id, Number(event.target.value))}
                          >
                            {[1, 2, 3, 4, 5].map((qty) => (
                              <option key={qty} value={qty}>{qty}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-green-600 font-semibold">SUPER DEALS</div>
                        <div className="text-[15px] font-semibold text-gray-900 mt-1">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.brand || 'Flipkart'}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-xs text-white bg-green-600 rounded px-1.5 py-0.5 font-semibold">
                            {Number(item.rating || 4).toFixed(1)}
                          </div>
                          <span className="text-xs text-gray-500">({item.rating_count || 0})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-green-600 font-semibold text-sm">
                            {item.mrp ? Math.round((1 - item.price / item.mrp) * 100) : 0}%
                          </span>
                          <span className="text-gray-500 line-through text-sm">₹{item.mrp}</span>
                          <span className="text-gray-900 font-semibold text-lg">₹{item.price}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Delivery by Apr 20, Mon</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 grid grid-cols-3 text-center text-sm text-gray-600">
                      <button className="py-3 hover:bg-gray-50">Save for later</button>
                      <button
                        className="py-3 hover:bg-gray-50 border-l border-r border-gray-200"
                        onClick={() => handleRemove(item.cart_item_id)}
                      >
                        Remove
                      </button>
                      <button className="py-3 hover:bg-gray-50">Buy this now</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-sm border border-gray-200 px-6 py-16 text-center flex flex-col items-center justify-center">
              <div className="w-[220px] h-[220px] rounded-full bg-[#f1f3f6] flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1.5" />
                  <circle cx="18" cy="21" r="1.5" />
                  <path d="M2 3h2l2.2 11.2a2 2 0 0 0 2 1.6h9.6a2 2 0 0 0 2-1.6L21 6H6" />
                </svg>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mt-6">Your Cart is Empty!</div>
            </div>
          )}
        </div>

        {hasItems && (
          <div className="w-[360px]">
            <div className="bg-white rounded-sm border border-gray-200 p-4">
              <div className="text-xs font-semibold text-gray-500 tracking-wide">PRICE DETAILS</div>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>MRP</span>
                  <span>₹{priceSummary.mrp.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fees</span>
                  <span>₹{priceSummary.fees.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discounts</span>
                  <span>-₹{priceSummary.discount.toFixed(0)}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{priceSummary.total.toFixed(0)}</span>
                </div>
              </div>
              <div className="mt-4 bg-green-50 text-green-700 text-sm font-semibold py-2 px-3 rounded">
                You&apos;ll save ₹{priceSummary.savings.toFixed(0)} on this order!
              </div>
            </div>

            <div className="mt-3 bg-white rounded-sm border border-gray-200 p-4 flex items-center gap-2 text-gray-600 text-sm">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">✓</span>
              Safe and secure payments. Easy returns. 100% Authentic products.
            </div>

            <button
              className="mt-3 w-full bg-[#f1c21b] text-black font-semibold py-3 rounded-sm"
              onClick={() => navigate('/checkout')}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
