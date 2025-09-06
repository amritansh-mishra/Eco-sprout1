import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500 transform hover:-translate-y-0.5 active:scale-95',
    secondary: 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 shadow-sm hover:shadow-md focus:ring-primary-500 transform hover:-translate-y-0.5 active:scale-95',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-600 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-primary-50 text-primary-600 focus:ring-primary-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg focus:ring-red-500 transform hover:-translate-y-0.5 active:scale-95',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg focus:ring-green-500 transform hover:-translate-y-0.5 active:scale-95',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-md hover:shadow-lg focus:ring-yellow-500 transform hover:-translate-y-0.5 active:scale-95',
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    default: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const iconSizes = {
    small: 'h-4 w-4',
    default: 'h-5 w-5',
    large: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const buttonClasses = `
    ₹{baseClasses}
    ₹{variants[variant]}
    ₹{sizes[size]}
    ₹{className}
  `;

  const iconClasses = `
    ₹{iconSizes[size]}
    ₹{iconPosition === 'right' ? 'ml-2' : 'mr-2'}
  `;

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className={`₹{iconClasses} animate-spin`} />;
    }
    if (icon) {
      return <span className={iconClasses}>{icon}</span>;
    }
    return null;
  };

  const renderShimmer = () => {
    if (variant === 'primary' || variant === 'danger' || variant === 'success' || variant === 'warning') {
      return (
        <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      );
    }
    return null;
  };

  return (
    <button
      type={type}
      className={`₹{buttonClasses} group`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {renderShimmer()}
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

// Specialized button components
export const IconButton = ({ icon, ...props }) => (
  <Button {...props} icon={icon} className="p-2" />
);

export const FloatingButton = ({ children, ...props }) => (
  <Button
    {...props}
    className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl z-40 animate-float"
  >
    {children}
  </Button>
);

export const GradientButton = ({ children, ...props }) => (
  <Button
    {...props}
    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
  >
    {children}
  </Button>
);

export default Button;
