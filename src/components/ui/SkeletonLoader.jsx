import React from 'react';

export const SkeletonLoader = ({ rows = 1, shape = 'rect', className = '', width = '100%', height = '16px' }) => {
  const shapes = {
    rect: 'rounded-md',
    circle: 'rounded-full',
  };

  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`${shapes[shape]} bg-gray-200`}
          style={{ width, height }}
        />
      ))}
    </div>
  );
};
