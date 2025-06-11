import React from 'react';

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary', 
  fullScreen = true, 
  message = null,
  className = '' 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const variantClasses = {
    primary: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
    green: 'border-green-600',
    red: 'border-red-600'
  };

  const spinnerClass = `animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className={spinnerClass}></div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm md:text-base font-medium">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {content}
      </div>
    );
  }

  return content;
}

// Alternative spinner variants
export function PulseLoader({ className = '', size = 'md' }) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3', 
    lg: 'h-4 w-4'
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-blue-600 rounded-full animate-pulse ${sizeClasses[size]}`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonLoader({ className = '', height = 'h-4', width = 'w-full' }) {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${height} ${width} ${className}`}></div>
  );
}