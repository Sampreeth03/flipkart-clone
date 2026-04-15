import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryBar from '../components/CategoryBar';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('for-you');
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);

  const categoryNameByKey = {
    'for-you': null,
    fashion: 'Fashion',
    mobiles: 'Mobiles',
    beauty: 'Beauty',
    electronics: 'Electronics',
    home: 'Home',
    appliances: 'Appliances',
    toys: 'Toys',
    'food-health': 'Food & Health',
    'auto-acc': 'Auto Accessories',
    'two-wheelers': 'Two Wheelers',
    sports: 'Sports',
    books: 'Books',
    furniture: 'Furniture',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
        const response = await axios.get(`${apiUrl}/products`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('orderPlaced') === '1') {
      setShowOrderPlaced(true);
      params.delete('orderPlaced');
      const nextSearch = params.toString();
      navigate(nextSearch ? `/?${nextSearch}` : '/', { replace: true });
    }
  }, [location.search, navigate]);

  const searchQuery = new URLSearchParams(location.search).get('q') || '';
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchedProducts = normalizedQuery
    ? products.filter((product) => {
      const haystack = `${product.name} ${product.brand} ${product.description} ${product.category_name}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    : products;

  const filteredProducts = activeCategory === 'for-you'
    ? searchedProducts
    : searchedProducts.filter((product) => product.category_name === categoryNameByKey[activeCategory]);

  return (
    /*
     * Home fills the full width inside App's main container (max-width 1280, padded 40px).
     * All content stays within the container to preserve left/right gaps.
     */
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      <CategoryBar activeKey={activeCategory} onSelect={setActiveCategory} />

      <HeroSlider categoryKey={activeCategory} />

      {showOrderPlaced && (
        <div className="bg-white border border-green-200 rounded-md px-4 py-3 mt-3 text-green-700 font-semibold">
          Order placed successfully.
        </div>
      )}

      {/* ── Product grid ── */}
      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 80, fontSize: 18, color: '#555', fontWeight: 600 }}>
          Loading products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: 80, fontSize: 18, color: '#555', fontWeight: 600 }}>
          {normalizedQuery
            ? `No products found for "${searchQuery}".`
            : 'No products available in this category.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 10, paddingBottom: 20 }}>
          <ProductGrid title="Suggested For You" products={filteredProducts} />
        </div>
      )}

      <Footer />

    </div>
  );
};

export default Home;