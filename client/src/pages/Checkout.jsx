import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: '',
    phone: '',
    altPhone: '',
    pincode: '',
    state: '',
    city: '',
    house: '',
    area: '',
    landmark: '',
    addressType: 'HOME',
  });
  const [showAltPhone, setShowAltPhone] = useState(false);
  const [showLandmark, setShowLandmark] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const paymentRef = useRef(null);

  const priceSummary = useMemo(() => {
    const mrp = cartItems.reduce((sum, item) => sum + (Number(item.mrp) || 0) * (item.quantity || 0), 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 0);
    const fees = 7;
    const discount = Math.max(0, mrp - subtotal);
    const total = subtotal + fees;
    const savings = Math.max(0, discount);

    return { mrp, fees, discount, total, savings };
  }, [cartItems]);

  useEffect(() => {
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

    fetchCart();
  }, []);

  const updateField = (field, value) => {
    setDeliveryForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (isAddressSaved) {
      setIsAddressSaved(false);
      setSaveMessage('');
    }
  };

  const handleFieldChange = (field) => (event) => {
    updateField(field, event.target.value);
  };

  const handleNumericChange = (field, maxLength) => (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (maxLength) {
      value = value.slice(0, maxLength);
    }
    updateField(field, value);
  };

  const validateDeliveryForm = () => {
    const nextErrors = {};
    if (!deliveryForm.fullName.trim()) nextErrors.fullName = 'Required';
    if (!deliveryForm.phone.trim()) {
      nextErrors.phone = 'Required';
    } else if (!/^\d{10}$/.test(deliveryForm.phone.trim())) {
      nextErrors.phone = 'Enter a 10-digit number';
    }
    if (!deliveryForm.pincode.trim()) {
      nextErrors.pincode = 'Required';
    } else if (!/^\d{6}$/.test(deliveryForm.pincode.trim())) {
      nextErrors.pincode = 'Enter a 6-digit pincode';
    }
    if (!deliveryForm.state.trim()) nextErrors.state = 'Required';
    if (!deliveryForm.city.trim()) nextErrors.city = 'Required';
    if (!deliveryForm.house.trim()) nextErrors.house = 'Required';
    if (!deliveryForm.area.trim()) nextErrors.area = 'Required';
    if (deliveryForm.altPhone.trim() && !/^\d{10}$/.test(deliveryForm.altPhone.trim())) {
      nextErrors.altPhone = 'Enter a 10-digit number';
    }
    return nextErrors;
  };

  const handleSaveAddress = () => {
    const nextErrors = validateDeliveryForm();
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setSaveMessage('Please complete the required fields to continue.');
      return;
    }

    setFormErrors({});
    setIsAddressSaved(true);
    setSaveMessage('Address saved. Continue to payment.');
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePayAmount = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    if (!isAddressSaved) {
      setSaveMessage('Please save the delivery instructions before payment.');
      return;
    }

    const addressLine1 = deliveryForm.house.trim();
    const addressLine2 = deliveryForm.area.trim();
    const landmark = deliveryForm.landmark.trim();
    const address = [addressLine1, addressLine2, landmark].filter(Boolean).join(', ');
    const shippingDetails = {
      name: deliveryForm.fullName.trim(),
      phone: deliveryForm.phone.trim(),
      altPhone: deliveryForm.altPhone.trim(),
      pincode: deliveryForm.pincode.trim(),
      state: deliveryForm.state.trim(),
      city: deliveryForm.city.trim(),
      addressLine1,
      addressLine2,
      landmark,
      addressType: deliveryForm.addressType,
      address,
    };

    try {
      const response = await axios.post(`${apiUrl}/orders`, { shippingDetails });
      const orderId = response?.data?.data?.orderId || `FKT${Date.now().toString().slice(-8)}`;
      const orderPayload = {
        id: orderId,
        placedAt: new Date().toLocaleString(),
        items: cartItems,
        summary: priceSummary,
        shippingDetails,
      };

      sessionStorage.setItem('lastOrder', JSON.stringify(orderPayload));
      window.dispatchEvent(new Event('cart-updated'));
      setCartItems([]);
      navigate('/order-confirmation', { state: { order: orderPayload } });
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="bg-[#f1f3f6] w-full py-4">
      <div className="max-w-[1320px] mx-auto flex gap-4">
        <div className="flex-1">
          <div className="bg-white rounded-sm border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="flex flex-col items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#0f5cf3] text-white text-[11px] flex items-center justify-center">✓</span>
                  <span>Address</span>
                </div>
                <div className="h-px w-16 bg-[#0f5cf3]" />
                <div className="flex flex-col items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#0f5cf3] text-white text-[11px] flex items-center justify-center">2</span>
                  <span className="text-gray-900 font-semibold">Order Summary</span>
                </div>
                <div className="h-px w-16 bg-gray-200" />
                <div className="flex flex-col items-center gap-1">
                  <span className="w-5 h-5 rounded-full border border-gray-300 text-[11px] flex items-center justify-center">3</span>
                  <span>Delivery Instructions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="bg-white rounded-sm border border-gray-200 p-8 text-center text-gray-600 font-semibold">
                Loading order summary...
              </div>
            ) : cartItems.length === 0 ? (
              <div className="bg-white rounded-sm border border-gray-200 p-8 text-center text-gray-600 font-semibold">
                Cart is empty.
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cart_item_id} className="bg-white rounded-sm border border-gray-200">
                    <div className="p-4 flex gap-4">
                      <div className="w-[96px] h-[128px] bg-[#f1f3f6] rounded-sm overflow-hidden flex items-center justify-center">
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
                      <div className="flex-1">
                        <div className="text-xs text-green-600 font-semibold">SUPER DEALS</div>
                        <div className="text-[15px] font-semibold text-gray-900 mt-1">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.brand || 'Flipkart'} · Qty: {item.quantity}</div>
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 bg-white rounded-sm border border-gray-200 px-4 py-4">
            <div className="text-sm font-semibold text-gray-900">Delivery Instructions</div>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <input
                  type="text"
                  placeholder="Full Name (Required) *"
                  value={deliveryForm.fullName}
                  onChange={handleFieldChange('fullName')}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
                {formErrors.fullName && <div className="text-xs text-red-600 mt-1">{formErrors.fullName}</div>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone number (Required) *"
                  value={deliveryForm.phone}
                  onChange={handleNumericChange('phone', 10)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
                {formErrors.phone && <div className="text-xs text-red-600 mt-1">{formErrors.phone}</div>}
              </div>

              {!showAltPhone ? (
                <button
                  type="button"
                  className="text-xs text-blue-600 font-semibold"
                  onClick={() => setShowAltPhone(true)}
                >
                  + Add Alternate Phone Number
                </button>
              ) : (
                <input
                  type="tel"
                  placeholder="Alternate Phone number"
                  value={deliveryForm.altPhone}
                  onChange={handleNumericChange('altPhone', 10)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
              )}
              {formErrors.altPhone && (
                <div className="text-xs text-red-600 mt-1">{formErrors.altPhone}</div>
              )}

              <div>
                <input
                  type="tel"
                  placeholder="Pincode (Required) *"
                  value={deliveryForm.pincode}
                  onChange={handleNumericChange('pincode', 6)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
                {formErrors.pincode && <div className="text-xs text-red-600 mt-1">{formErrors.pincode}</div>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="State (Required) *"
                    value={deliveryForm.state}
                    onChange={handleFieldChange('state')}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                  />
                  {formErrors.state && <div className="text-xs text-red-600 mt-1">{formErrors.state}</div>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City (Required) *"
                    value={deliveryForm.city}
                    onChange={handleFieldChange('city')}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                  />
                  {formErrors.city && <div className="text-xs text-red-600 mt-1">{formErrors.city}</div>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="House No., Building Name (Required) *"
                  value={deliveryForm.house}
                  onChange={handleFieldChange('house')}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
                {formErrors.house && <div className="text-xs text-red-600 mt-1">{formErrors.house}</div>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Road name, Area, Colony (Required) *"
                  value={deliveryForm.area}
                  onChange={handleFieldChange('area')}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
                {formErrors.area && <div className="text-xs text-red-600 mt-1">{formErrors.area}</div>}
              </div>

              {!showLandmark ? (
                <button
                  type="button"
                  className="text-xs text-blue-600 font-semibold"
                  onClick={() => setShowLandmark(true)}
                >
                  + Add Nearby Famous Shop/Mall/Landmark
                </button>
              ) : (
                <input
                  type="text"
                  placeholder="Nearby Famous Shop/Mall/Landmark"
                  value={deliveryForm.landmark}
                  onChange={handleFieldChange('landmark')}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm"
                />
              )}

              <div>
                <div className="text-xs text-gray-500 mb-2">Type of address</div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex items-center gap-2 border rounded-full px-4 py-2 text-xs font-semibold ${
                      deliveryForm.addressType === 'HOME'
                        ? 'border-gray-900 text-gray-900'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setDeliveryForm((prev) => ({ ...prev, addressType: 'HOME' }))}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 border rounded-full px-4 py-2 text-xs font-semibold ${
                      deliveryForm.addressType === 'WORK'
                        ? 'border-gray-900 text-gray-900'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setDeliveryForm((prev) => ({ ...prev, addressType: 'WORK' }))}
                  >
                    Work
                  </button>
                </div>
              </div>

              {saveMessage && (
                <div className={`text-xs ${isAddressSaved ? 'text-green-600' : 'text-red-600'}`}>{saveMessage}</div>
              )}

              <button
                type="button"
                className="w-full bg-[#fb641b] text-white text-sm font-semibold py-2.5 rounded-sm"
                onClick={handleSaveAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>

        <div className="w-[360px]">
          <div ref={paymentRef} className="bg-white rounded-sm border border-gray-200 p-4">
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

          <div className="mt-3 bg-white rounded-sm border border-gray-200 p-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 line-through">₹{priceSummary.mrp.toFixed(0)}</div>
              <div className="text-lg font-semibold text-gray-900">₹{priceSummary.total.toFixed(0)}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {!isAddressSaved && (
                <div className="text-[11px] text-red-500">Save address to continue</div>
              )}
              <button
                className="bg-[#f1c21b] text-black font-semibold px-8 py-2 rounded-sm disabled:opacity-60"
                onClick={handlePayAmount}
                disabled={cartItems.length === 0 || !isAddressSaved}
              >
                Pay Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
