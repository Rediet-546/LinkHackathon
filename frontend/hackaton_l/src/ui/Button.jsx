import React from 'react'

   const Button = ({ 
    children, 
    variant = "default", 
    size = "default", 
    className = "",
    onClick
  }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      default: "bg-gray-900 text-white hover:bg-gray-800 shadow dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
      blue: "bg-blue-900 text-white hover:bg-blue-800 shadow dark:bg-blue-50 dark:text-gray-900 dark:hover:bg-gray-200",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100",
      ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
      humberger: "hover:bg-blue-100 hover:text-gray-900 dark:hover:bg-blue-800 dark:hover:text-gray-100"
    };
    
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3",
      vsm: "h-6 rounded-md px-2",
      lg: "h-11 rounded-md px-8"
    };
    
    return (
      <button 
        className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };


export default Button