"use client";

import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
