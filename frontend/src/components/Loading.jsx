import React from 'react';
import { Leaf, Loader2 } from 'lucide-react';

const Loading = ({ 
  size = 'default', 
  text = 'Loading...', 
  showText = true,
  variant = 'default' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'eco') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative">
          <div className={`₹{sizeClasses[size]} animate-spin`}>
            <Leaf className="h-full w-full text-primary-600" />
          </div>
          <div className="absolute inset-0 animate-ping">
            <Leaf className="h-full w-full text-primary-400 opacity-75" />
          </div>
        </div>
        {showText && (
          <p className={`₹{textSizeClasses[size]} text-gray-600 animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        {showText && (
          <p className={`₹{textSizeClasses[size]} text-gray-600`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className={`₹{sizeClasses[size]} bg-primary-600 rounded-full animate-pulse`}></div>
        {showText && (
          <p className={`₹{textSizeClasses[size]} text-gray-600 animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Loader2 className={`₹{sizeClasses[size]} text-primary-600 animate-spin`} />
      {showText && (
        <p className={`₹{textSizeClasses[size]} text-gray-600`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Skeleton loading components
export const SkeletonCard = () => (
  <div className="card p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

export const SkeletonItem = () => (
  <div className="card overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ₹{className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-200 rounded ₹{
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

export default Loading;
