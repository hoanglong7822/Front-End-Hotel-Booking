// TrendingDestination.js
import React from 'react';

const TrendingDestination = ({ popularDestinationsData }) => {
  return (
    <div className="px-2 md:px-0 container mt-8">
      {/* Grid với 2 cột cho các địa điểm đầu tiên */}
      <h2 className="text-3xl font-medium text-slate-700">
        Book Hotels at Popular Destinations
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
        {popularDestinationsData.data.slice(0, 2).map((destination, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg  hover:scale-105"
          >
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity duration-300 flex items-end p-4">
              <h3 className="text-white text-lg font-semibold">
                {destination.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid với 3 cột cho các địa điểm tiếp theo */}
      <div className="grid grid-cols-3 gap-4">
        {popularDestinationsData.data.slice(2).map((destination, index) => (
          <div
            key={index + 2}
            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity duration-300 flex items-end p-4">
              <h3 className="text-white text-lg font-semibold">
                {destination.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingDestination;
