import { useEffect, useMemo, useState } from 'react';

const slideAssets = import.meta.glob(
  '../assets/images/sliding images/*/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
);

const folderKeyByCategory = {
  'for-you': 'foryou',
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

const buildImagesByFolder = () => {
  const grouped = {};

  Object.entries(slideAssets).forEach(([path, src]) => {
    const parts = path.split('/sliding images/');
    if (parts.length < 2) return;
    const folder = parts[1].split('/')[0];
    const fileName = parts[1].split('/').pop() || '';

    if (!/^[0-9]+\.(webp|png|jpg|jpeg)$/i.test(fileName)) {
      return;
    }

    if (!grouped[folder]) {
      grouped[folder] = [];
    }
    grouped[folder].push(src);
  });

  Object.keys(grouped).forEach((folder) => {
    grouped[folder].sort();
  });

  return grouped;
};

const imagesByFolder = buildImagesByFolder();

const HeroSlider = ({ categoryKey = 'for-you' }) => {
  const folderKey = folderKeyByCategory[categoryKey] || 'foryou';
  const slides = useMemo(() => imagesByFolder[folderKey] || [], [folderKey]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    if (slides.length === 0) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex !== slides.length || slides.length === 0) return;

    const resetTimer = setTimeout(() => {
      setNoTransition(true);
      setActiveIndex(0);
      requestAnimationFrame(() => {
        setNoTransition(false);
      });
    }, 650);

    return () => clearTimeout(resetTimer);
  }, [activeIndex, slides.length]);

  useEffect(() => {
    setActiveIndex(0);
    setNoTransition(false);
  }, [categoryKey, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const gap = 16;
  const cardWidth = `calc((100% - ${gap * 2}px) / 2.5)`;
  const shift = `calc(-${activeIndex} * (${cardWidth} + ${gap}px))`;
  const visibleSlides = useMemo(() => [...slides, ...slides], [slides]);

  return (
    <section style={{ marginTop: 10, marginBottom: 12 }}>
      <div style={{
        width: '100%',
        height: 220,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          height: '100%',
          gap,
          transform: `translateX(${shift})`,
          transition: noTransition ? 'none' : 'transform 0.6s ease',
        }}>
          {visibleSlides.map((src, index) => (
            <div
              key={`${src}-${index}`}
              style={{
                minWidth: cardWidth,
                height: '100%',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#fff',
                border: '1px solid #e6e9ef',
              }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
        {slides.map((_, index) => (
          <span
            key={`dot-${index}`}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: index === activeIndex ? '#2468f2' : '#c7cdd6',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
