import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { differenceInCalendarDays } from 'date-fns';
import DateRangePicker from 'components/ux/data-range-picker/DateRangePicker';
import { DEFAULT_TAX_DETAILS } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { formatPrice } from 'utils/price-helpers';
import Toast from 'components/ux/toast/Toast';
import format from 'date-fns/format';
import apiService from 'services/request';
import { useSelector } from 'react-redux';
/**
 * A component that displays the booking details for a hotel, including date range, room type, and pricing.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.hotelCode - The unique code for the hotel.
 */
const HotelBookingDetailsCard = ({ hotelCode, hotelDetails }) => {
  // State for date picker visibility
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [room, setRoom] = useState([]);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => {
    return state.auth.user;
  });
  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  // State for date range
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  // State for selected room, guests, and rooms
  const [selectedRoom, setSelectedRoom] = useState({
    value: '',
    label: '',
    roomId: '',
  });
  const [selectedGuests, setSelectedGuests] = useState({
    value: 2,
    label: '2 guests',
  });
  const [selectedRooms, setSelectedRooms] = useState({
    value: 0,
    label: '0 room',
  });
  const [text, setText] = useState(true);
  useEffect(() => {
    let arrRoom = [];
    hotelDetails.roomTypes.forEach((element) => {
      const newArr = {
        roomId: element.roomId,
        value: element.roomType,
        label: element.roomType,
      };
      arrRoom.push(newArr);
    });
    setRoom(arrRoom);
  }, [hotelDetails.roomTypes, hotelCode]);
  // State for pricing and booking details
  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [bookingPeriodDays, setBookingPeriodDays] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});
  // Options for guests and rooms
  const guestOptions = Array.from(
    { length: bookingDetails.maxGuestsAllowed },
    (_, i) => ({ value: i + 1, label: `${i + 1} guest` })
  );
  const roomNumberOptions = Array.from(
    { length: bookingDetails.maxRoomsAllowedPerGuest },
    (_, i) => ({ value: i + 1, label: `${i + 1} room` })
  );
  // Handlers for select changes
  const handleRoomTypeChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    calculatePrices();
  };
  const handleGuestsNumberChange = (selectedOption) => {
    setSelectedGuests(selectedOption);
  };
  const handleRoomsNumberChange = (selectedOption) => {
    setSelectedRooms(selectedOption);
    calculatePrices();
  };
  useEffect(() => {
    const checkFormValidity = async () => {
      if (dateRange[0].endDate && selectedRoom.value !== '') {
        const params = {
          start_date: dateRange[0].startDate,
          end_date: dateRange[0].endDate,
          roomId: selectedRoom.roomId,
        };
        const response = await apiService.post(
          `/api/hotel/${hotelCode}/booking/enquiry`,
          params
        );
        if (response.status === 200) {
          setBookingDetails(response.data);
          setText(false);
        }
      }
    };
    checkFormValidity();
  }, [selectedRoom, dateRange, hotelCode]);
  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  /**
   * Handler for date range changes. Updates the booking period days and recalculates prices.
   *
   * @param {Object} ranges - The selected date ranges.
   */
  const onDateChangeHandler = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    const days =
      startDate && endDate
        ? differenceInCalendarDays(endDate, startDate) + 1
        : 1;
    setBookingPeriodDays(days);
    calculatePrices();
  };

  /**
   * Calculates the total price and taxes based on the selected room and booking period.
   */
  const calculatePrices = () => {
    const pricePerNight = bookingDetails.currentNightRate * selectedRooms.value;
    // const gstRate =
    //   pricePerNight <= 2500 ? 0.12 : pricePerNight > 7500 ? 0.18 : 0.12;
    // const totalGst = (pricePerNight * bookingPeriodDays * gstRate).toFixed(2);
    // const totalPrice = (pricePerNight * bookingPeriodDays +parseFloat(totalGst)).toFixed(2);
    const tax = bookingDetails.currentNightRate * selectedRooms.value * 0.05;
    const totalPrice = pricePerNight + tax;
    if (!isNaN(totalPrice)) {
      setTotal(`${formatPrice(totalPrice)} VND`);
    }
    setTaxes(`${formatPrice(tax)} VND`);
  };

  const onBookingConfirm = () => {
    if (!dateRange[0].startDate || !dateRange[0].endDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      return;
    }
    const checkIn = format(dateRange[0].startDate, 'dd-MM-yyyy');
    const checkOut = format(dateRange[0].endDate, 'dd-MM-yyyy');
    const queryParams = userDetails
      ? {
          total,
          userId: userDetails.id,
          hotelCode,
          checkIn,
          checkOut,
          guests: selectedGuests.value,
          rooms: selectedRooms.value,
          roomId: selectedRoom.roomId,
          hotelName: bookingDetails.name.replaceAll(' ', '-'), // url friendly hotel name
        }
      : {
          total,
          hotelCode,
          checkIn,
          checkOut,
          guests: selectedGuests.value,
          rooms: selectedRooms.value,
          roomId: selectedRoom.roomId,
          hotelName: bookingDetails.name.replaceAll(' ', '-'), // url friendly hotel name
        };
    const url = `/checkout?${queryString.stringify(queryParams)}`;
    navigate(url, {
      state: {
        total,
        checkInTime: bookingDetails.checkInTime,
        checkOutTime: bookingDetails.checkOutTime,
      },
    });
  };

  // Handler for dismissing error message
  const dismissError = () => {
    setErrorMessage('');
  };

  // Effect for initial price calculation
  useEffect(() => {
    calculatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingPeriodDays, selectedRooms, selectedRoom, bookingDetails]);

  return (
    <div className="mx-2 bg-white shadow-xl rounded-xl overflow-hidden mt-2 md:mt-0 w-full md:w-[380px]">
      <div className="px-6 py-4 bg-brand text-white">
        <h2 className="text-xl font-bold">Booking Details</h2>
      </div>
      {text === true ? (
        <h2 className="mt-4 ml-6 text-red-600">
          Select the time and room type to view the details
        </h2>
      ) : (
        <></>
      )}
      <div className="p-6 text-sm md:text-base">
        {/* Dates & Time */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Dates & Time</div>
          <div className="text-gray-600">
            <DateRangePicker
              isDatePickerVisible={isDatePickerVisible}
              onDatePickerIconClick={onDatePickerIconClick}
              onDateChangeHandler={onDateChangeHandler}
              setisDatePickerVisible={setisDatePickerVisible}
              dateRange={dateRange}
              inputStyle="DARK"
            />
          </div>
        </div>
        {/* Room Type */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Room Type</div>
          <Select
            value={selectedRoom}
            onChange={handleRoomTypeChange}
            options={room}
          />
          {text === false ? (
            <h3 className=" mt-2 text-base text-green-600">
              {' '}
              Rooms available: {bookingDetails.maxRoomsAllowedPerGuest}{' '}
            </h3>
          ) : (
            <></>
          )}
        </div>
        {/* Reservation */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Rooms</div>
          <Select
            value={selectedRooms}
            onChange={handleRoomsNumberChange}
            options={roomNumberOptions}
            className="mb-2"
          />
          <Select
            value={selectedGuests}
            onChange={handleGuestsNumberChange}
            options={guestOptions}
          />
        </div>

        {/* Per day rate */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Per day rate</div>
          <div className="text-gray-600">
            {formatPrice(bookingDetails.currentNightRate)} VND
          </div>
        </div>

        {/* Taxes */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Taxes</div>
          <div className="text-gray-600">{taxes}</div>
          <div className="text-xs text-gray-500">{DEFAULT_TAX_DETAILS}</div>
        </div>
        {/* Total Price */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">
            Total Price
          </div>
          <div className="text-xl font-bold text-indigo-600">{total}</div>
          <div className="text-sm text-green-600">
            {bookingDetails.cancellationPolicy}
          </div>
        </div>

        {errorMessage && (
          <Toast
            type="error"
            message={errorMessage}
            dismissError={dismissError}
          />
        )}
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={onBookingConfirm}
          className="w-full bg-brand-secondary text-white py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default HotelBookingDetailsCard;
