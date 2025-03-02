import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
