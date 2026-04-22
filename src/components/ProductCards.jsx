import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Buttons';

const ProductCard = ({ product, onAdd }) => {
  if (!product) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link to={`/products/${product.slug}`} className="block relative group h-64 bg-gray-100 dark:bg-gray-700">
        <img 
          src={product.image || 'https://via.placeholder.com/400'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" 
        />
        {product.sale_price && (
          <span className="absolute top-3 left-3 bg-[#C5A059] text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
            Sale
          </span>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/products/${product.slug}`} className="block flex-grow">
          {product.category && (
            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest">{product.category}</span>
          )}
          <h3 className="font-bold text-zinc-900 dark:text-white text-lg mt-2 mb-4 line-clamp-2 hover:text-[#C5A059] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between border-t border-gray-50 dark:border-gray-700 pt-4">
          <div className="flex flex-col">
            {product.sale_price ? (
              <>
                <span className="text-[#C5A059] font-bold text-lg">৳{product.sale_price.toLocaleString()}</span>
                <span className="text-zinc-400 line-through text-xs">৳{product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-zinc-900 dark:text-white font-bold text-lg">৳{product.price.toLocaleString()}</span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (onAdd) onAdd(product);
            }} 
            className="bg-zinc-900 hover:bg-black text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
