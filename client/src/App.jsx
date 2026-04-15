import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <Router>
      {/* Header is sticky full-width — it handles its own inner max-width */}
      <Header />

      {/* Page body — white background */}
      <div style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── Main content container: centered with left/right gap ── */}
        <main style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 44px',       /* gives the left & right white-space gap */
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;