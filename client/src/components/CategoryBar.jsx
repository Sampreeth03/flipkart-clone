import { useEffect, useState } from 'react';
import forYouIcon from '../assets/images/categoryBar/foryou.svg';
import fashionIcon from '../assets/images/categoryBar/fashion.svg';
import mobilesIcon from '../assets/images/categoryBar/mobiles.svg';
import beautyIcon from '../assets/images/categoryBar/beauty.svg';
import electronicsIcon from '../assets/images/categoryBar/electronics.svg';
import homeIcon from '../assets/images/categoryBar/home.svg';
import appliancesIcon from '../assets/images/categoryBar/tv.svg';
import toysIcon from '../assets/images/categoryBar/toy.svg';
import foodIcon from '../assets/images/categoryBar/food.svg';
import autoAccIcon from '../assets/images/categoryBar/auto-acc.svg';
import twoWheelerIcon from '../assets/images/categoryBar/scooter.svg';
import sportsIcon from '../assets/images/categoryBar/sport.svg';
import booksIcon from '../assets/images/categoryBar/books.svg';
import furnitureIcon from '../assets/images/categoryBar/furniture.svg';

const categories = [
  { key: 'for-you',      name: 'For You',      icon: forYouIcon },
  { key: 'fashion',      name: 'Fashion',      icon: fashionIcon },
  { key: 'mobiles',      name: 'Mobiles',      icon: mobilesIcon },
  { key: 'beauty',       name: 'Beauty',       icon: beautyIcon },
  { key: 'electronics',  name: 'Electronics',  icon: electronicsIcon },
  { key: 'home',         name: 'Home',         icon: homeIcon },
  { key: 'appliances',   name: 'Appliances',   icon: appliancesIcon },
  { key: 'toys',         name: 'Toys, ba...',  icon: toysIcon },
  { key: 'food-health',  name: 'Food & H...',  icon: foodIcon },
  { key: 'auto-acc',     name: 'Auto Acc...',  icon: autoAccIcon },
  { key: 'two-wheelers', name: '2 Wheele...',  icon: twoWheelerIcon },
  { key: 'sports',       name: 'Sports & ...', icon: sportsIcon },
  { key: 'books',        name: 'Books & ...',  icon: booksIcon },
  { key: 'furniture',    name: 'Furniture',    icon: furnitureIcon },
];

const CategoryBar = ({ activeKey = 'for-you', onSelect = () => {} }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 140);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Sticky category strip aligned to page container */
    <div style={{
      background: '#fff',
      width: '100%',
      borderBottom: '1px solid #e8e8e8',
      position: 'sticky',
      top: 136,
      zIndex: 40,
      paddingTop: collapsed ? 1 : 3,
      paddingBottom: collapsed ? 3 : 4,
      minHeight: collapsed ? 48 : 78,
    }}>
      {/*
       * Uses full container width (App already provides the side gutters).
       */}
      <div style={{
        width: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        overflowX: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
        className="scrollbar-hide"
      >
        {categories.map((cat) => {
          const isActive = activeKey === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onSelect(cat.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 76,
                padding: collapsed ? '6px 6px 0 6px' : '6px 6px 0 6px',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                fontFamily: 'inherit',
                outline: 'none',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 38,
                height: collapsed ? 0 : 38,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? '#eaf3ff' : 'transparent',
                boxShadow: isActive ? '0 2px 6px rgba(15, 92, 243, 0.15)' : '0 0 0 rgba(0,0,0,0)',
                marginBottom: collapsed ? 0 : 6,
                overflow: 'hidden',
                opacity: collapsed ? 0 : 1,
                transform: collapsed ? 'scale(0.85)' : 'scale(1)',
                transition: 'height 0.3s ease, opacity 0.3s ease, transform 0.3s ease, margin 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
              }}>
                <img src={cat.icon} alt={cat.name} style={{ width: 30, height: 30 }} />
              </div>
              <span style={{
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: '#212121',
                whiteSpace: 'nowrap',
                paddingBottom: 7,
                borderBottom: isActive ? '3px solid #0f5cf3' : '3px solid transparent',
                transition: 'border-color 0.3s ease, font-weight 0.3s ease',
              }}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;