import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getCategoryImages } from '../utils/categoryImages';
import fallbackImage from '../assets/images/casualshirts.webp';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        const response = await axios.get(`${apiUrl}/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchCartStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cart`);
        const items = response?.data?.data?.items || [];
        const found = items.some((item) => String(item.product_id) === String(id));
        setInCart(found);
      } catch (error) {
        setInCart(false);
      }
    };

    fetchCartStatus();
    window.addEventListener('cart-updated', fetchCartStatus);
    return () => window.removeEventListener('cart-updated', fetchCartStatus);
  }, [id]);

  const imageList = useMemo(() => {
    if (!product) return [];

    const productImages = Array.isArray(product.images)
      ? product.images.map((image) => image.image_url).filter(Boolean)
      : [];
    const primaryImage = product.primary_image ? [product.primary_image] : [];
    const categoryImages = getCategoryImages(product);

    if (categoryImages.length > 0) {
      return categoryImages;
    }
    if (productImages.length > 0) {
      return productImages;
    }
    if (primaryImage.length > 0) {
      return primaryImage;
    }
    return [];
  }, [product]);

  const carouselImages = useMemo(() => {
    if (imageList.length === 0) return [fallbackImage, fallbackImage];
    if (imageList.length === 1) return [imageList[0], imageList[0]];
    return imageList;
  }, [imageList, fallbackImage]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id, carouselImages.length]);

  const priceValue = Number(product?.price || 0);
  const mrpValue = Number(product?.mrp || 0);
  const discountPercent = mrpValue > priceValue
    ? Math.round(((mrpValue - priceValue) / mrpValue) * 100)
    : 0;
  const bestOfferPrice = priceValue > 50 ? priceValue - 50 : priceValue;
  const formatRupee = (value) => Number(value || 0).toLocaleString('en-IN');

  const bankOffers = [
    { id: 'bhim', amount: 50, label: 'BHIM', footer: 'UPI - Cashback', badge: 'Best value for you' },
    { id: 'axis-cc', amount: 14, label: 'Flipkart Axis', footer: 'Credit Card - Cashback' },
    { id: 'paytm', amount: 50, label: 'Paytm', footer: 'UPI - Cashback' },
    { id: 'axis-dc', amount: 14, label: 'Flipkart Axis', footer: 'Debit Card - Cashback' },
  ];

  const handleAddToCart = async () => {
    if (!product) return;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    try {
      await axios.post(`${apiUrl}/cart`, { productId: product.id, quantity: 1 });
      setInCart(true);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handlePrimaryAction = async () => {
    if (inCart) {
      navigate('/cart');
      return;
    }
    await handleAddToCart();
  };

  const handleBuyNow = async () => {
    if (!inCart) {
      await handleAddToCart();
    }
    navigate('/checkout');
  };

  const hasImages = carouselImages.length > 0;
  const activeImage = hasImages
    ? carouselImages[activeImageIndex]
    : fallbackImage;

  const handlePrevImage = () => {
    if (!hasImages) return;
    setSlideDirection('right');
    setActiveImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNextImage = () => {
    if (!hasImages) return;
    setSlideDirection('left');
    setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handleThumbnailClick = (index) => {
    if (index === activeImageIndex) return;
    setSlideDirection(index > activeImageIndex ? 'left' : 'right');
    setActiveImageIndex(index);
  };

  if (loading) {
    return (
      <div className="bg-[#f1f3f6] w-full py-10 text-center text-gray-600 font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#f1f3f6] w-full py-10 text-center text-gray-600 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f1f3f6] w-full py-4">
      <div className="max-w-[1320px] mx-auto flex gap-4 items-stretch">
        <div className="w-[700px] shrink-0 bg-white rounded-xl p-3">
          <div className="relative w-full h-[520px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
              <div
                key={`${activeImageIndex}-${activeImage}`}
                className={`w-full h-full ${slideDirection === 'left' ? 'pd-slide-left' : 'pd-slide-right'}`}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              {carouselImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 hover:bg-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 hover:bg-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
          </div>
            {carouselImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {carouselImages.map((src, index) => (
                <button
                  type="button"
                  key={`${src}-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`w-20 h-20 rounded-lg border ${
                    index === activeImageIndex ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'
                  } overflow-hidden shrink-0 bg-white`}
                >
                  <img
                    src={src}
                    alt={`${product.name} ${index + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-[460px] shrink-0 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <button className="text-[14px] text-blue-600 font-semibold">Visit brand store</button>
              <div className="mt-1 text-[18px] font-semibold text-gray-900 leading-snug">
                {product.name}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 bg-gray-100 rounded-lg px-2.5 py-1">
                <span className="text-[13px] font-semibold text-gray-900">
                  {product.rating?.toFixed ? product.rating.toFixed(1) : product.rating || '4.0'}
                </span>
                <span className="text-green-700 text-[14px]">★</span>
                <span className="text-[12px] text-gray-500">|</span>
                <span className="text-[12px] text-gray-600">
                  {(product.rating_count || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-2 text-[14px] text-gray-600">{product.description}</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="inline-flex items-center gap-2 bg-green-700 text-white text-[12px] font-semibold px-3 py-1 rounded-md">
                Hot Deal
              </div>
              <div className="mt-2 flex items-end gap-2">
                {discountPercent > 0 && (
                  <span className="text-green-700 text-[26px] font-bold flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {discountPercent}%
                  </span>
                )}
                {mrpValue > priceValue && (
                  <span className="text-gray-400 line-through text-[22px]">₹{formatRupee(mrpValue)}</span>
                )}
                <span className="text-gray-900 text-[26px] font-bold">₹{formatRupee(priceValue)}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-blue-300 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0b3db3] to-[#1160e8] text-white px-4 py-3 text-[15px] font-semibold flex items-center justify-between">
                <span>Apply offers for maximum savings</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6 12l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="bg-[#dff0ff] p-4">
                <div className="text-[22px] font-semibold text-gray-900">Buy at ₹{formatRupee(bestOfferPrice)}</div>

                <div className="mt-3 bg-white rounded-xl p-3">
                  <div className="text-[14px] font-semibold text-gray-700">Bank offers</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {bankOffers.map((offer, index) => (
                      <div key={offer.id} className="border border-gray-100 rounded-lg p-2 bg-white">
                        {offer.badge && index === 0 && (
                          <div className="inline-flex bg-[#ffe7a3] text-[#6b4e00] text-[11px] font-semibold px-2 py-0.5 rounded-md mb-1">
                            {offer.badge}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[14px] font-semibold text-gray-900">₹{offer.amount} off</div>
                            <div className="text-[13px] text-gray-600">{offer.label}</div>
                          </div>
                          <div className="text-blue-600 text-[14px] font-semibold">Apply</div>
                        </div>
                        <div className="mt-1 text-[12px] text-gray-600">{offer.footer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between text-[14px] font-semibold text-gray-800">
                <span>Apply for Card and Instant EMI</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6 12l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-3 border border-gray-100 rounded-lg p-3 text-[13px] flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900">₹1,250 Gift Vouchers | 5% Cash...</div>
                  <div className="text-[12px] text-gray-500">Flipkart Axis Bank Credit Card</div>
                  <div className="text-blue-600 text-[13px] font-semibold mt-2">Apply Now</div>
                </div>
                <div className="w-12 h-8 bg-[#f1f3f6] rounded-md flex items-center justify-center text-[10px] font-semibold text-gray-600">
                  EMI
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-[16px] font-semibold text-gray-900">Delivery details</div>

              <div className="mt-3 rounded-lg bg-blue-50 text-[14px] text-gray-800 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s-6-5.1-6-10a6 6 0 1112 0c0 4.9-6 10-6 10z" stroke="#111" strokeWidth="1.6" />
                    <circle cx="12" cy="11" r="2.3" stroke="#111" strokeWidth="1.6" />
                  </svg>
                  <span>Academic Block, IIIT Sricity, 630 Gyan Marg Circle, S...</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 5l6 5-6 5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 flex items-center gap-2 text-[14px] text-gray-800">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="1.5" y="6" width="13" height="9" rx="2" stroke="#111" strokeWidth="1.6" />
                  <path d="M14.5 10h4l3 3v2h-7" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
                  <circle cx="7" cy="17" r="2" stroke="#111" strokeWidth="1.6" />
                  <circle cx="18" cy="17" r="2" stroke="#111" strokeWidth="1.6" />
                </svg>
                <span className="font-semibold">Delivery by 21 Apr, Tue</span>
              </div>

              <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
                <div className="flex items-center gap-2 text-[14px] text-gray-800">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16v10H4z" stroke="#111" strokeWidth="1.6" />
                    <path d="M7 7V5h10v2" stroke="#111" strokeWidth="1.6" />
                    <path d="M7 13h10" stroke="#111" strokeWidth="1.6" />
                  </svg>
                  <span>Fulfilled by HKVFashions</span>
                </div>
                <div className="mt-1 text-[13px] text-gray-600">4.1 ★ • 4 years with Flipkart</div>
                <button className="mt-1 text-[13px] font-semibold text-blue-600">See other sellers</button>
              </div>

              <div className="mt-3 border-t border-gray-100 pt-3 grid grid-cols-3 gap-3 text-center text-[13px] text-gray-700">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3l7 4v10l-7 4-7-4V7z" stroke="#111" strokeWidth="1.6" />
                      <path d="M9 11l2 2 4-4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>10-Day Return</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[14px] font-semibold text-blue-600">₹</div>
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-semibold text-blue-600">24x7</div>
                  <span>Customer support</span>
                </div>
              </div>
            </div>

          </div>

          <div className="sticky bottom-4">
            <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-2">
              <button
                className="flex-1 border border-gray-300 rounded-lg py-3 text-[14px] font-semibold text-gray-800 transition-colors duration-150 hover:bg-gray-100"
                onClick={handlePrimaryAction}
              >
                {inCart ? 'Go to cart' : 'Add to cart'}
              </button>
              <button
                className="flex-1 bg-[#ffe11b] rounded-lg py-3 text-[14px] font-semibold text-gray-900 transition-colors duration-150 hover:bg-[#fff3a0]"
                onClick={handleBuyNow}
              >
                Buy at ₹{product.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
