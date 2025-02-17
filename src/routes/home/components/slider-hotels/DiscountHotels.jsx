import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { store } from '../../../../redux/store';
import { addFavoriteHotel } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';

const DiscountHotels = ({ DiscountHotelsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const favorite = useSelector((state) => state.favorite);
  const navigate = useNavigate();

  const hotelsWithFavoriteStatus = DiscountHotelsData.map((hotel) => ({
    ...hotel,
    isFavorite: favorite.some((fav) => fav.id === hotel.id),
  }));

  const visibleHotels = 4;

  const dispatchFavorite = (hotel) => {
    store.dispatch(addFavoriteHotel(hotel));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? hotelsWithFavoriteStatus.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= hotelsWithFavoriteStatus.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="px-2 md:px-0 container mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-medium text-slate-700 text-center ml-4">
          Deals for the weekend
        </h2>
      </div>

      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-slate-100 text-slate-700 rounded-full hover:bg-opacity-75 focus:outline-none z-10 w-10 h-10 flex items-center justify-center"
          >
            &lt;
          </button>
        )}

        <div className="flex overflow-hidden">
          <div
            className="flex w-full gap-2 transition-transform duration-500 ease-in-out bg-blue-600"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleHotels)}%)`,
            }}
          >
            {hotelsWithFavoriteStatus.map((hotel) => (
              <div
                key={hotel.Id}
                className="w-full bg-black md:w-1/2  transition-transform duration-300 transform hover:scale-105 relative"
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={hotel.images}
                    alt={hotel.name}
                    className="w-full h-32 object-cover cursor-pointer"
                    onClick={() => navigate(`/hotel/${hotel.hotelId}`)} // Navigate to hotel details page
                  />
                  <button
                    onClick={() => {
                      dispatchFavorite(hotel);
                    }}
                    className="absolute top-4 right-4 items-center pt-1 w-8 h-8 rounded-full bg-white shadow-md focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={hotel.isFavorite ? solidHeart : regularHeart}
                      className={`text-xl ${hotel.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold">{hotel.name}</h3>
                    <p className="text-xs text-gray-700 truncate">
                      {hotel.address}
                    </p>
                    <div className="flex items-center space-x-1 text-xs mt-2">
                      <span className="text-gray-700 font-medium">
                        {hotel.rating}
                      </span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-500">
                        ({hotel.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <p className="text-red-500 line-through">
                        VND: {hotel.oldPrice.toLocaleString('vi-VN')}
                      </p>
                      <p className="font-bold">
                        VND: {hotel.newPrice.toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <p className="text-xs font-bold mt-1">
                      Discount: {hotel.discount} %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentIndex + visibleHotels < hotelsWithFavoriteStatus.length && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-slate-100 text-slate-700 rounded-full hover:bg-opacity-75 focus:outline-none z-10 w-10 h-10 flex items-center justify-center"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default DiscountHotels;
