import { Link } from 'react-router-dom';
import { getCategoryImages } from '../utils/categoryImages';

const ProductGrid = ({ title, products }) => {
  return (
    <div className="bg-[#f1f3f6] py-5 w-full">
      <div className="max-w-[1320px] mx-auto bg-transparent rounded-xl px-1">
        <div className="flex justify-between items-center mb-5 px-4">
          <h2 className="text-[22px] font-bold text-gray-900">{title}</h2>
        </div>

        <div className="bg-white rounded-xl pt-2 pb-4">
          <div className="grid grid-cols-4 gap-y-3 gap-x-0">
            {products.map((product) => {
              const categoryImages = getCategoryImages(product);
              const imageSrc = categoryImages[0]
                || product.primary_image
                || 'https://placehold.co/600x600/e5e7eb/111?text=';

              return (
                <div key={product.id} className="bg-[#f1f3f6] px-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="group block rounded-xl hover:shadow-sm transition-shadow cursor-pointer relative overflow-hidden min-h-[420px] bg-white"
                  >
                    <span
                      className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-3"
                      aria-hidden="true"
                    />
                    <div className="relative bg-white rounded-xl p-2">
                      <div className="w-full h-[320px] flex items-center justify-center mb-3 bg-white rounded-lg overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = 'https://placehold.co/600x600/e5e7eb/111?text=';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-[13px] text-[#212121] font-semibold leading-snug truncate">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-[#6b6b6b] leading-snug truncate">
                        {product.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-gray-500 line-through text-xs">₹{product.mrp}</span>
                        <span className="text-black font-bold text-[14px]">₹{product.price}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
