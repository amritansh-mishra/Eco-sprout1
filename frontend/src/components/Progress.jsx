import React from 'react';

const Progress = ({
  value,
  max = 100,
  size = 'default',
  variant = 'default',
  showLabel = true,
  label,
  className = '',
  animated = true,
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    small: 'h-2',
    default: 'h-3',
    large: 'h-4',
    xl: 'h-6',
  };

  const variants = {
    default: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600',
    gradient: 'bg-gradient-to-r from-primary-500 to-primary-700',
  };

  const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
  const barClasses = `
    ₹{sizeClasses[size]}
    ₹{variants[variant]}
    ₹{animated ? 'transition-all duration-1000 ease-out' : ''}
    rounded-full
  `;

  return (
    <div className={`space-y-2 ₹{className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            {label || `₹{Math.round(percentage)}%`}
          </span>
          {label && (
            <span className="text-sm text-gray-500">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      
      <div className={baseClasses}>
        <div
          className={barClasses}
          style={{ width: `₹{percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress
export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  label,
  className = '',
  animated = true,
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    default: 'stroke-primary-600',
    success: 'stroke-green-600',
    warning: 'stroke-yellow-600',
    danger: 'stroke-red-600',
    info: 'stroke-blue-600',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ₹{className}`} {...props}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`₹{variants[variant]} ₹{animated ? 'transition-all duration-1000 ease-out' : ''}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(percentage)}%
            </div>
            {label && (
              <div className="text-xs text-gray-600">
                {label}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Step Progress
export const StepProgress = ({
  steps,
  currentStep,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: {
      active: 'bg-primary-600 text-white',
      completed: 'bg-primary-600 text-white',
      pending: 'bg-gray-200 text-gray-600',
    },
    success: {
      active: 'bg-green-600 text-white',
      completed: 'bg-green-600 text-white',
      pending: 'bg-gray-200 text-gray-600',
    },
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className={`flex items-center ₹{className}`} {...props}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;
        
        return (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ₹{variants[variant][status]}
                `}
              >
                {status === 'completed' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-3">
                <div className={`text-sm font-medium ₹{
                  status === 'active' ? 'text-primary-600' : 
                  status === 'completed' ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            
            {!isLast && (
              <div className={`flex-1 h-0.5 mx-4 ₹{
                index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
              } transition-colors duration-300`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Progress;
