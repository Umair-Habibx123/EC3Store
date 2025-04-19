import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = ''
}) => {
  // Size variants
  const sizeClasses = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-[6px]'
  };

  // Color variants
  const colorClasses = {
    primary: 'border-t-indigo-600',
    secondary: 'border-t-purple-600',
    success: 'border-t-emerald-600',
    danger: 'border-t-rose-600',
    warning: 'border-t-amber-600',
    light: 'border-t-gray-200',
    dark: 'border-t-gray-800'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animationDuration: '0.75s' }}
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;