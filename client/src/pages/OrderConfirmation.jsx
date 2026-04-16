import { useLocation, useNavigate } from 'react-router-dom';
import fallbackImage from '../assets/images/casualshirts.webp';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || null;

  return (
    <div className="bg-[#f1f3f6] w-full py-6">
      <div className="max-w-[1320px] mx-auto flex gap-4">
        <div className="flex-1">
          <div className="bg-white rounded-sm border border-gray-200 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 10.5l3.2 3.2L15 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="text-lg font-semibold text-gray-900">Order Placed Successfully</div>
                <div className="text-sm text-gray-500">Thank you for shopping with us.</div>
              </div>
            </div>
            {order && (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Order ID:</span> {order.id}
                <span className="mx-2 text-gray-300">|</span>
                <span className="font-semibold text-gray-800">Placed:</span> {order.placedAt}
              </div>
            )}
            {order && (
              <div className="mt-2 text-xs text-gray-500">
                Keep this Order ID for tracking and support.
              </div>
            )}
          </div>

          {order ? (
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.cart_item_id} className="bg-white rounded-sm border border-gray-200">
                  <div className="p-4 flex gap-4">
                    <div className="w-[96px] h-[128px] bg-[#f1f3f6] rounded-sm overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image || fallbackImage}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.brand || 'Flipkart'} · Qty: {item.quantity}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-500 line-through text-sm">₹{item.mrp}</span>
                        <span className="text-gray-900 font-semibold text-lg">₹{item.price}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Delivery by Apr 20, Mon</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 bg-white rounded-sm border border-gray-200 p-8 text-center text-gray-600 font-semibold">
              Order details are not available. Please continue shopping.
            </div>
          )}
        </div>

        <div className="w-[360px]">
          <div className="bg-white rounded-sm border border-gray-200 p-4">
            <div className="text-xs font-semibold text-gray-500 tracking-wide">ORDER SUMMARY</div>
            <div className="mt-3 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>MRP</span>
                <span>₹{order?.summary?.mrp?.toFixed(0) || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees</span>
                <span>₹{order?.summary?.fees?.toFixed(0) || '0'}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discounts</span>
                <span>-₹{order?.summary?.discount?.toFixed(0) || '0'}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{order?.summary?.total?.toFixed(0) || '0'}</span>
              </div>
            </div>
            <div className="mt-4 bg-green-50 text-green-700 text-sm font-semibold py-2 px-3 rounded">
              You saved ₹{order?.summary?.savings?.toFixed(0) || '0'} on this order!
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <button
              className="w-full bg-[#f1c21b] text-black font-semibold py-3 rounded-sm"
              onClick={() => navigate('/my-orders')}
            >
              Go to My Orders
            </button>
            <button
              className="w-full border border-gray-300 text-gray-800 font-semibold py-3 rounded-sm"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
