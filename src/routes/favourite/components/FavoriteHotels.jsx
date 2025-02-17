import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const FavoriteHotels = () => {
  const favorites = useSelector((state) => state.favorite);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(favorites);
  // Handle removing a hotel from favorites
  const handleRemoveFavorite = (hotel) => {
    dispatch({ type: 'DELETE_FAVORITE_HOTEL', payload: hotel });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Hotels</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((hotel) => (
            <div
              key={hotel.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFavorite(hotel)}
                className="absolute top-2 right-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center z-10 hover:bg-red-600"
              >
                ×
              </button>
              {/* Hotel Image */}
              <div
                onClick={() => navigate(`/hotel/${hotel.hotelId}`)}
                className="cursor-pointer"
              >
                <img
                  src={hotel.images}
                  alt={hotel.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Hotel Details */}
              <div className="p-4">
                {/* Title */}
                <h2
                  className="text-lg font-semibold group-hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigate(`/hotel/${hotel.hotelId}`)}
                >
                  {hotel.title}
                </h2>
                {/* Subtitle */}
                <p className="text-gray-600 text-sm">{hotel.subtitle}</p>
                {/* Price and Discount */}
                <div className="mt-2">
                  <p className="text-gray-800 font-semibold">
                    Price:{' '}
                    <span className="">
                      {hotel.newPrice.toLocaleString('en-US')} VND
                    </span>{' '}
                    {hotel.oldPrice && (
                      <span className="text-red-500 line-through text-sm ml-2">
                        {hotel.oldPrice.toLocaleString('en-US')} VND
                      </span>
                    )}
                  </p>
                  {/* City */}
                  <p className="text-gray-800">City: {hotel.address}</p>
                  {/* Rating and Reviews */}
                  <div className="flex items-center space-x-2">
                    <p className="text-yellow-500 flex items-center">
                      ⭐ {hotel.rating}
                    </p>
                    <p className="text-gray-600 text-sm">
                      ({hotel.reviewCount} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          You haven't added any favorite hotels yet.
        </p>
      )}
    </div>
  );
};

export default FavoriteHotels;
