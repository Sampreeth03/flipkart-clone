import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const orderData = useMemo(() => {
    const raw = sessionStorage.getItem('lastOrder');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const items = orderData?.items || [];
  const summary = orderData?.summary || {
    mrp: 0,
    fees: 0,
    discount: 0,
    total: 0,
    savings: 0,
  };

  return (
    <div className="bg-[#f1f3f6] w-full py-6">
      <div className="max-w-[1320px] mx-auto flex gap-4">
        <div className="flex-1">
          <div className="bg-white rounded-sm border border-gray-200 px-4 py-4">
            <div className="text-lg font-semibold text-gray-900">Your Order Placed Successfully</div>
            <div className="text-sm text-gray-500 mt-1">Order details are below.</div>
          </div>

          <div className="mt-4 bg-white rounded-sm border border-gray-200 px-4 py-3">
            <div className="text-sm font-semibold text-gray-800">Order Successful</div>
            <div className="text-xs text-gray-500 mt-1">Payment confirmed. Preparing your items.</div>
          </div>

          <div className="mt-4 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-sm border border-gray-200 p-8 text-center text-gray-600 font-semibold">
                No order details found.
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cart_item_id} className="bg-white rounded-sm border border-gray-200">
                  <div className="p-4 flex gap-4">
                    <div className="w-[96px] h-[128px] bg-[#f1f3f6] rounded-sm overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = `https://placehold.co/200x260/e5e7eb/111?text=${encodeURIComponent(item.name)}`;
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
              ))
            )}
          </div>
        </div>

        <div className="w-[360px]">
          <div className="bg-white rounded-sm border border-gray-200 p-4">
            <div className="text-xs font-semibold text-gray-500 tracking-wide">ORDER SUMMARY</div>
            <div className="mt-3 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>MRP</span>
                <span>₹{summary.mrp.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees</span>
                <span>₹{summary.fees.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discounts</span>
                <span>-₹{summary.discount.toFixed(0)}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{summary.total.toFixed(0)}</span>
              </div>
            </div>
            <div className="mt-4 bg-green-50 text-green-700 text-sm font-semibold py-2 px-3 rounded">
              You saved ₹{summary.savings.toFixed(0)} on this order!
            </div>
          </div>

          <button
            className="mt-3 w-full bg-[#f1c21b] text-black font-semibold py-3 rounded-sm"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
