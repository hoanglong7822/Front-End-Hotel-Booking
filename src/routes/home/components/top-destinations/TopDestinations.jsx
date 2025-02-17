import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories } from 'utils/constants';
const TrendingDestinations = ({ locations }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleDestinations = 6;

  useEffect(() => {
    const newFilteredDestinations = locations.filter(
      (location) => location.type === selectedCategory.name
    );
    setFilteredDestinations(newFilteredDestinations);
  }, [selectedCategory, locations]); // dependencies ensure rerender on change
  // Handle slide movement
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredDestinations.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= filteredDestinations.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="ml-2 font-medium text-slate-700">
        <h1 className="text-3xl">Quick and easy trip planner</h1>
        <h2 className="text-base">
          Pick a vibe and explore the top destinations in Vietnam
        </h2>
      </div>
      <div className="flex mx-2 mt-6 space-x-4 mb-6">
        {categories.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setSelectedCategory(type);
              setCurrentIndex(0);
            }}
            className={`px-4   py-2 rounded-full ${
              selectedCategory.name === type.name
                ? 'border-solid border-2 border-blue-600'
                : ''
            }`}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={type.icon}
            ></FontAwesomeIcon>
            <span>{type.name}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-opacity-75 focus:outline-none z-10 w-10 h-10 flex items-center justify-center"
          >
            &lt;
          </button>
        )}

        <div className="flex overflow-hidden">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleDestinations)}%)`,
            }}
          >
            {filteredDestinations.map((location) => (
              <div
                key={location.locationId}
                className=" p-2 flex-shrink-0 w-1/2 md:w-1/6"
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-md font-medium  ">{location.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentIndex + visibleDestinations < filteredDestinations.length && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-opacity-75 focus:outline-none z-10 w-10 h-10 flex items-center justify-center"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default TrendingDestinations;
