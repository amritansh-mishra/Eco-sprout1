import React from 'react';

const Card = ({
  children,
  variant = 'default',
  hover = false,
  padding = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300';
  
  const variants = {
    default: 'shadow-lg',
    elevated: 'shadow-xl',
    flat: 'shadow-none border-0 bg-white/5',
    outlined: 'shadow-lg border-2 border-white/30',
    glass: 'bg-white/15 backdrop-blur-lg border-white/30 shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 shadow-xl',
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/20 cursor-pointer' : '';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const cardClasses = `
    ₹{baseClasses}
    ₹{variants[variant]}
    ₹{hoverClasses}
    ₹{paddingClasses[padding]}
    ₹{className}
  `;

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Specialized card components
export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'primary',
  trend = 'up',
  ...props 
}) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-green-600 bg-green-50',
    warning: 'text-yellow-600 bg-yellow-50',
    danger: 'text-red-600 bg-red-50',
    info: 'text-blue-600 bg-blue-50',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→',
  };

  return (
    <Card {...props} className="text-center">
      <div className="flex items-center justify-center mb-3">
        <div className={`p-3 rounded-full ₹{colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {title}
      </div>
      {change && (
        <div className={`text-xs flex items-center justify-center ₹{
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
          <span className="mr-1">{trendIcons[trend]}</span>
          {change}
        </div>
      )}
    </Card>
  );
};

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  ...props 
}) => (
  <Card hover {...props}>
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="p-3 bg-primary-100 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  </Card>
);

export const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  avatar, 
  rating = 5,
  ...props 
}) => (
  <Card {...props} className="text-center">
    <div className="mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ₹{
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
    <blockquote className="text-gray-700 mb-6 italic">
      "{quote}"
    </blockquote>
    <div className="flex items-center justify-center space-x-3">
      {avatar && (
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
    </div>
  </Card>
);

export const ProductCard = ({ 
  title, 
  price, 
  image, 
  seller, 
  rating, 
  ecoScore,
  condition,
  ...props 
}) => (
  <Card hover {...props} className="overflow-hidden">
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      {ecoScore && (
        <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          🌱 {ecoScore}
        </div>
      )}
      {condition && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {condition}
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-2 truncate">
        {title}
      </h3>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xl font-bold text-primary-600">
          ₹{price}
        </div>
        {rating && (
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        )}
      </div>
      {seller && (
        <div className="text-sm text-gray-600">
          by {seller}
        </div>
      )}
    </div>
  </Card>
);

export default Card;
