import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import fallbackImage from '../assets/images/casualshirts.webp';

const formatCurrency = (value) => Number(value || 0).toFixed(0);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      try {
        const response = await axios.get(`${apiUrl}/orders`);
        const payload = Array.isArray(response?.data?.data) ? response.data.data : [];
        setOrders(payload);
        if (payload.length > 0) {
          setSelectedOrderId((prev) => prev ?? payload[0].id);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0] || null;
  const activeItem = selectedOrder?.items?.[0] || null;

  const timeline = useMemo(() => {
    if (!selectedOrder?.created_at) return [];
    const placed = new Date(selectedOrder.created_at);
    const shipped = new Date(placed);
    shipped.setDate(shipped.getDate() + 2);
    const delivered = new Date(placed);
    delivered.setDate(delivered.getDate() + 7);

    return [
      { label: 'Order Confirmed, Today', note: `Your Order has been placed., ${placed.toDateString()}` },
      { label: `Shipped, Expected By ${shipped.toDateString()}` },
      { label: 'Out For Delivery' },
      { label: `Delivery, ${delivered.toDateString()} By 11 PM` },
    ];
  }, [selectedOrder?.created_at]);

  if (loading) {
    return (
      <div className="bg-[#f1f3f6] w-full py-6">
        <div className="max-w-[1320px] mx-auto bg-white border border-gray-200 rounded-sm p-6 text-center text-gray-600 font-semibold">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="bg-[#f1f3f6] w-full py-6">
        <div className="max-w-[1320px] mx-auto bg-white border border-gray-200 rounded-sm p-6 text-center text-gray-600 font-semibold">
          No orders yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] w-full py-6">
      <div className="max-w-[1320px] mx-auto text-xs text-gray-400 mb-3">
        Home &gt; My Account &gt; My Orders
      </div>
      <div className="max-w-[1320px] mx-auto flex gap-4">
        <div className="flex-1">
          <div className="space-y-4">
            {orders.map((order) => {
              const orderItems = Array.isArray(order.items) ? order.items : [];
              return (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedOrderId(order.id)}
                className={`w-full text-left bg-white border rounded-sm p-4 ${
                  order.id === selectedOrderId ? 'border-blue-400 shadow-sm' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Order ID: {order.id}</div>
                    <div className="text-xs text-gray-500">Placed on {new Date(order.created_at).toDateString()}</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">₹{formatCurrency(order.total_amount)}</div>
                </div>

                <div className="mt-4 space-y-3">
                  {orderItems.map((item) => (
                    <div key={`${order.id}-${item.product_id}`} className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-[#f1f3f6] rounded-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image_url || fallbackImage}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackImage;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-gray-900">{item.product_name}</div>
                        <div className="text-xs text-gray-500">{item.brand || 'Seller: Readernovels'} · Qty: {item.quantity}</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">₹{formatCurrency(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </button>
            );
            })}
          </div>
        </div>

        <div className="w-[360px] space-y-4">
          <div className="bg-white border border-gray-200 rounded-sm p-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">Pay online for a smooth doorstep experience</div>
            <button className="border border-blue-500 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-md">
              Pay ₹{formatCurrency(selectedOrder.total_amount)}
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-4">
            <div className="space-y-6">
              {timeline.map((step, index) => (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`w-4 h-4 rounded-full border ${index === 0 ? 'bg-green-600 border-green-600' : 'border-gray-300'}`} />
                    {index < timeline.length - 1 && <span className="flex-1 w-px bg-gray-200" />}
                  </div>
                  <div>
                    <div className={`text-sm ${index === 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                      {step.label}
                    </div>
                    {step.note && <div className="text-xs text-gray-500">{step.note}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Delivery Executive details will be available once the order is out for delivery
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <button className="font-semibold">Cancel</button>
              <button className="font-semibold">Chat with us</button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-4">
            <div className="text-sm font-semibold text-gray-900">Delivery details</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-500">{selectedOrder.shipping_address_type || 'Other'}</span>
                <span>{selectedOrder.shipping_address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>{selectedOrder.shipping_name}</span>
                <span className="text-gray-500">{selectedOrder.shipping_phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-4">
            <div className="text-sm font-semibold text-gray-900">Price details</div>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Listing price</span>
                <span>₹{formatCurrency(activeItem?.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Selling price</span>
                <span>₹{formatCurrency(activeItem?.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total fees</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Other discount</span>
                <span>-₹0</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between font-semibold">
                <span>Total amount</span>
                <span>₹{formatCurrency(selectedOrder.total_amount)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 text-sm">
                <span>Paid By</span>
                <span>Cash On Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;