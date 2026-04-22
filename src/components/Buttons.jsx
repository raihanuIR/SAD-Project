import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-zinc-900 hover:bg-black text-white shadow-sm",
    secondary: "bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white shadow-sm",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
    ghost: "text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    cart: "h-10 w-10 bg-slate-100 dark:bg-gray-700 hover:bg-[#C5A059] dark:hover:bg-[#b08d4a] hover:text-white rounded-full flex items-center justify-center transition-colors text-slate-600 dark:text-gray-300"
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
