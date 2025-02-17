import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelDetailsViewCard from './components/hotel-details-view-card/HotelDetailsViewCard';
import HotelDetailsViewCardSkeleton from './components/hotel-details-view-card-skeleton/HotelDetailsViewCardSkeleton';
import apiService from 'services/request';

/**
 * Represents the hotel details component.
 * @component
 * @returns {JSX.Element} The hotel details component.
 */
const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState({
    isLoading: true,
    data: {},
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await apiService.get(`/api/hotel/${hotelId}`);
      setHotelDetails({
        isLoading: false,
        data: response.data,
      });
    };

    fetchHotelDetails();
  }, [hotelId]);
  return (
    <>
      {hotelDetails.isLoading ? (
        <HotelDetailsViewCardSkeleton />
      ) : (
        <HotelDetailsViewCard hotelDetails={hotelDetails.data} />
      )}
    </>
  );
};

export default HotelDetails;
