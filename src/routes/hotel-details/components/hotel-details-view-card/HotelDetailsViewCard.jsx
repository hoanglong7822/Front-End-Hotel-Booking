import HotelBookingDetailsCard from '../hotel-booking-details-card/HotelBookingDetailsCard';
import UserReviews from '../user-reviews/UserReviews';
import React, { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import apiService from 'services/request';

const HotelDetailsViewCard = ({ hotelDetails }) => {
  const images = hotelDetails.images.map((image) => ({
    original: image.imageUrl,
    thumbnail: image.imageUrl,
    thumbnailClass: 'h-[80px]',
    thumbnailLoading: 'lazy',
  }));
  const [reviewData, setReviewData] = useState({
    isLoading: true,
    data: [],
  });
  const [currentReviewsPage, setCurrentReviewPage] = useState(1);
  const [submitStatus, setSubmitStatus] = useState(false);
  const handleSetSubmitStatus = () => {
    setSubmitStatus((prev) => !prev);
  };
  const handlePageChange = (page) => {
    setCurrentReviewPage(page);
  };

  const handlePreviousPageChange = () => {
    setCurrentReviewPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const handleNextPageChange = () => {
    setCurrentReviewPage((prev) => {
      if (prev >= reviewData.pagination.totalPages) return prev;
      return prev + 1;
    });
  };
  useEffect(() => {
    setReviewData({
      isLoading: true,
      data: [],
    });
    const fetchHotelReviews = async () => {
      const response = await apiService.post(
        `/api/hotel/${hotelDetails.hotelCode}/reviews`,
        { currentPage: currentReviewsPage, hotelId: hotelDetails._id }
      );
      if (response.status === 200) {
        setReviewData({
          isLoading: false,
          data: response.data.data,
          metadata: response.data.metadata,
          pagination: response.data.paging,
        });
      }
    };
    fetchHotelReviews();
  }, [
    hotelDetails.hotelCode,
    currentReviewsPage,
    hotelDetails._id,
    submitStatus,
  ]);
  return (
    <div
      style={{ marginTop: '56px' }}
      className="flex items-start justify-center flex-wrap md:flex-nowrap container mx-auto p-4"
    >
      <div className="w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div>
          <div className="relative w-full">
            <ReactImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
            />
            {hotelDetails.discount && (
              <div className="absolute top-0 right-0 m-4 px-2 py-1 bg-yellow-500 text-white font-semibold text-xs rounded">
                {hotelDetails.discount} OFF
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {hotelDetails.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {hotelDetails.subtitle}
            </p>
            <div className="mt-2 space-y-2">
              {hotelDetails.description.map((line, index) => (
                <p key={index} className="text-gray-700">
                  {line}
                </p>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">
                  {hotelDetails.benefits.join(' | ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UserReviews
          hotelCode={hotelDetails._id}
          reviewData={reviewData}
          handlePageChange={handlePageChange}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
          handleSetSubmitStatus={handleSetSubmitStatus}
        />
      </div>
      <HotelBookingDetailsCard
        hotelDetails={hotelDetails}
        hotelCode={hotelDetails.hotelCode}
      />
    </div>
  );
};

export default HotelDetailsViewCard;
