import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
    : success 
    ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400';

  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
  
  const iconClasses = icon 
    ? iconPosition === 'left' 
      ? 'pl-12' 
      : 'pr-12'
    : '';

  const inputClasses = `
    ₹{baseClasses}
    ₹{stateClasses}
    ₹{disabledClasses}
    ₹{iconClasses}
    ₹{isPassword ? 'pr-12' : ''}
    ₹{className}
  `;

  const getStatusIcon = () => {
    if (error) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    if (success) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && !isPassword && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
        
        {getStatusIcon() && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getStatusIcon()}
          </div>
        )}
        
        {/* Focus indicator */}
        <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-opacity duration-200 ₹{
          isFocused 
            ? error 
              ? 'border-red-500 opacity-100' 
              : success 
                ? 'border-green-500 opacity-100'
                : 'border-primary-500 opacity-100'
            : 'opacity-0'
        }`} />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 animate-fade-in-up">
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-green-600 animate-fade-in-up">
          {success}
        </p>
      )}
    </div>
  );
};

// Specialized input components
export const SearchInput = ({ onSearch, ...props }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="pr-12"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 transition-colors"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none';
  
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
    : success 
    ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 hover:border-gray-400';

  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
  
  const textareaClasses = `
    ₹{baseClasses}
    ₹{stateClasses}
    ₹{disabledClasses}
    ₹{className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 animate-fade-in-up">
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-green-600 animate-fade-in-up">
          {success}
        </p>
      )}
    </div>
  );
};

export default Input;
