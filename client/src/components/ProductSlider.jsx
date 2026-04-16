import { Link } from 'react-router-dom';
import fallbackImage from '../assets/images/casualshirts.webp';

const ProductSlider = ({ title, products }) => {
  return (
    <div className="bg-[#f1f3f6] py-3 w-full">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg p-3 shadow-sm">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="flex overflow-x-auto space-x-1 scrollbar-hide pb-1 snap-x snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group min-w-[120px] max-w-[120px] flex-shrink-0 border border-gray-200 rounded-md p-1.5 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden snap-start"
            >
              <span
                className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-3"
                aria-hidden="true"
              />
              <div className="relative w-full h-[110px] flex items-center justify-center mb-0.5">
                <img
                  src={product.primary_image || fallbackImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
              <h3 className="relative text-[11px] text-gray-800 font-medium truncate leading-tight">{product.name}</h3>
              <div className="relative mt-0.5 flex items-center space-x-1">
                <span className="text-gray-500 line-through text-[10px]">₹{product.mrp}</span>
                <span className="text-black font-bold text-[11px]">₹{product.price}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductSlider;