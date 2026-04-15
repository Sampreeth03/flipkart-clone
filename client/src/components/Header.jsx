import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import flipkartLogo from '../assets/images/header/flipkart-logo.webp';
import scooterLogo from '../assets/images/header/scooter-logo.webp';
import flightLogo from '../assets/images/header/flight-logo.webp';
import profileLogo from '../assets/images/header/profile-logo.svg';
import cartLogo from '../assets/images/header/cart_image.svg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCartPage = location.pathname === '/cart';
  const [cartCount, setCartCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const fetchCartCount = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    try {
      const response = await fetch(`${apiUrl}/cart`);
      const payload = await response.json();
      const items = payload?.data?.items || [];
      const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(count);
    } catch (error) {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
    window.addEventListener('cart-updated', fetchCartCount);
    return () => window.removeEventListener('cart-updated', fetchCartCount);
  }, [fetchCartCount]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchValue((prev) => (prev === query ? prev : query));
  }, [location.search]);

  useEffect(() => {
    setIsAccountOpen(false);
  }, [location.pathname]);

  const accountMenuItems = [
    { label: 'My Orders', action: () => navigate('/my-orders') },
    { label: 'My Profile' },
    { label: 'Coupons' },
    { label: 'Supercoin' },
    { label: 'Flipkart Plus Zone' },
    { label: 'Saved Cards & Wallet' },
    { label: 'Saved Addresses' },
    { label: 'Wishlist' },
    { label: 'Gift Cards' },
    { label: 'Notifications' },
    { label: 'Logout' },
  ];

  const handleAccountAction = (action) => {
    setIsAccountOpen(false);
    if (action) action();
  };

  const accountMenu = (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        right: 0,
        width: 280,
        background: '#fff',
        border: '1px solid #e4e7eb',
        borderRadius: 12,
        boxShadow: '0 18px 30px rgba(17, 24, 39, 0.12)',
        zIndex: 60,
        padding: 12,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: '#2f2f2f', marginBottom: 8 }}>Your Account</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {accountMenuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleAccountAction(item.action)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              border: 'none',
              padding: '8px 6px',
              textAlign: 'left',
              fontSize: 13,
              fontWeight: 500,
              color: '#2f2f2f',
              borderRadius: 8,
              cursor: 'pointer',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = '#f5f7fb';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c7ced8', flexShrink: 0 }} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const applySearch = useCallback((nextValue) => {
    const params = new URLSearchParams(location.search);
    const trimmed = nextValue.trim();

    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }

    params.delete('orderPlaced');
    const search = params.toString();
    const target = search ? `/?${search}` : '/';
    const current = `${location.pathname}${location.search}`;

    if (current !== target) {
      navigate(target);
    }
  }, [location.pathname, location.search, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentQuery = params.get('q') || '';

    if (currentQuery === searchValue) {
      return undefined;
    }

    const handler = window.setTimeout(() => {
      applySearch(searchValue);
    }, 300);

    return () => window.clearTimeout(handler);
  }, [applySearch, location.search, searchValue]);

  if (isCartPage) {
    return (
      <header style={{
        background: '#fff',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: 'none',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}>
        <div style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 44px',
          borderBottom: '1px solid #e0e0e0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 12,
            paddingBottom: 12,
            gap: 24,
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: '#ffe11b',
              border: 'none',
              borderRadius: 13,
              height: 44,
              width: 140,
              padding: '0 10px',
              cursor: 'pointer',
              flexShrink: 0,
            }}>
              <img src={flipkartLogo} alt="Flipkart" style={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }} />
              <span style={{
                fontStyle: 'italic',
                color: '#111',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '-0.2px',
                fontFamily: 'inherit',
                lineHeight: 1,
              }}>Flipkart</span>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                <path d="M5 7l5 5 5-5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #3192ff',
              borderRadius: 11,
              background: '#fff',
              padding: '0 18px',
              height: 44,
              gap: 12,
            }}>
              <svg width="22" height="22" fill="none" stroke="#8d8d8d" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    applySearch(searchValue);
                  }
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  color: '#5a5a5a',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontWeight: 500,
                }}
              />
            </div>

            <div
              style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#212121',
              whiteSpace: 'nowrap',
              flexShrink: 0,
                position: 'relative',
              }}
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              <img src={profileLogo} alt="Profile" style={{ width: 26, height: 26, objectFit: 'contain' }} />
              <span>Sampreeth</span>
              <svg width="10" height="10" fill="none" viewBox="0 0 20 20">
                <path d="M5 7l5 5 5-5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isAccountOpen && accountMenu}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#212121',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              <span>More</span>
              <svg width="10" height="10" fill="none" viewBox="0 0 20 20">
                <path d="M5 7l5 5 5-5" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <Link
              to="/cart"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                textDecoration: 'none',
                color: '#212121',
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={cartLogo} alt="Cart" style={{ width: 26, height: 26, objectFit: 'contain' }} />
                <span style={{
                  position: 'absolute',
                  top: -6,
                  right: -7,
                  background: '#ef303e',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 14,
                  height: 14,
                  fontSize: 9,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #f1f3f6',
                }}>{cartCount}</span>
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header style={{
      background: '#fff',
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: 'none',
      fontFamily: 'Roboto, Arial, sans-serif',
    }}>

      {/* ── INNER WRAPPER — gives the left/right gap like the original ── */}
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '0 44px',
        borderBottom: '1px solid #e0e0e0',
      }}>

        {/* ── ROW 1: Logo pills | Location | Supercoins ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 13,
          gap: 0,
        }}>

          {/* ── LEFT: Flipkart logo pill ── */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: '#ffe11b',
            border: 'none',
            borderRadius: 13,
            height: 44,
            width: 124,
            padding: '0 8px',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            <img src={flipkartLogo} alt="Flipkart" style={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }} />
            <span style={{
              fontStyle: 'italic',
              color: '#111',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '-0.2px',
              fontFamily: 'inherit',
              lineHeight: 1,
            }}>Flipkart</span>
          </button>

          {/* Minutes pill */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: '#f2f2f2',
            border: '1px solid #dddddd',
            borderRadius: 13,
            height: 44,
            width: 124,
            padding: '0 8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 12,
            color: '#2f2f2f',
            fontFamily: 'inherit',
            marginLeft: 14,
            flexShrink: 0,
          }}>
            <img src={scooterLogo} alt="Minutes" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
            <span>Minutes</span>
          </button>

          {/* Travel pill */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: '#f2f2f2',
            border: '1px solid #dddddd',
            borderRadius: 13,
            height: 44,
            width: 124,
            padding: '0 8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 12,
            color: '#2f2f2f',
            fontFamily: 'inherit',
            marginLeft: 14,
            flexShrink: 0,
          }}>
            <img src={flightLogo} alt="Travel" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
            <span>Travel</span>
          </button>

          {/* Location — center */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginLeft: 'auto',
            marginRight: 18,
            fontSize: 14,
            flexShrink: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.2C5.3 1.2 3.1 3.4 3.1 6.1c0 3.6 4.9 8.7 4.9 8.7s4.9-5.1 4.9-8.7c0-2.7-2.2-4.9-4.9-4.9zm0 6.6a1.7 1.7 0 110-3.4 1.7 1.7 0 010 3.4z" fill="#222"/>
            </svg>
            <span style={{ color: '#222', fontWeight: 600 }}>Location not set</span>
            <span style={{ color: '#2468f2', fontWeight: 700, cursor: 'pointer' }}>
              Select delivery location
            </span>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
              <path d="M6.5 4.5L12 10l-5.5 5.5" stroke="#2468f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Supercoin — right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, background: '#efe9cb', borderRadius: 10, minWidth: 42, height: 26, padding: '0 9px' }}>
            <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#f9cc00', color: '#5c4d11', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>⚡</span>
            <span style={{ fontWeight: 700, fontSize: 12, color: '#333' }}>0</span>
          </div>
        </div>

        {/* ── ROW 2: Search | User | More | Cart ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 12,
          gap: 28,
          marginTop: 8,
        }}>

          {/* Search bar */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            border: '2px solid #3192ff',
            borderRadius: 11,
            background: '#fff',
            padding: '0 18px',
            height: 44,
            gap: 12,
            marginLeft: 10,
          }}>
            <svg width="22" height="22" fill="none" stroke="#8d8d8d" strokeWidth="1.8" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  applySearch(searchValue);
                }
              }}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: 14,
                color: '#5a5a5a',
                background: 'transparent',
                fontFamily: 'inherit',
                fontWeight: 500,
              }}
            />
          </div>

          {/* User */}
          <div
            style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            color: '#212121',
            whiteSpace: 'nowrap',
            flexShrink: 0,
              position: 'relative',
            }}
            onMouseEnter={() => setIsAccountOpen(true)}
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <img src={profileLogo} alt="Profile" style={{ width: 26, height: 26, objectFit: 'contain' }} />
            <span>Sampreeth</span>
            <svg width="10" height="10" fill="none" viewBox="0 0 20 20">
              <path d="M5 7l5 5 5-5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isAccountOpen && accountMenu}
          </div>

          {/* More */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            color: '#212121',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            <span>More</span>
            <svg width="10" height="10" fill="none" viewBox="0 0 20 20">
              <path d="M5 7l5 5 5-5" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              textDecoration: 'none',
              color: '#212121',
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <div style={{ position: 'relative' }}>
                <img src={cartLogo} alt="Cart" style={{ width: 26, height: 26, objectFit: 'contain' }} />
              <span style={{
                position: 'absolute',
                  top: -6,
                  right: -7,
                  background: '#ef303e',
                color: '#fff',
                  borderRadius: '50%',
                  width: 14,
                  height: 14,
                  fontSize: 9,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                  border: '2px solid #f1f3f6',
              }}>{cartCount}</span>
            </div>
            <span>Cart</span>
          </Link>

        </div>
      </div>
      {/* ── END INNER WRAPPER ── */}

    </header>
  );
};

export default Header;