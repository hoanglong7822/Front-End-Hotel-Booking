import HeroCover from './components/hero-cover/HeroCover';
import PropertyType from './components/property-type/PropertyType';
import DiscountHotels from './components/slider-hotels/DiscountHotels';
import HotelImageWithText from './components/image/HotelImageWithText';
import TopDestinations from './components/top-destinations/TopDestinations';
import TrendingDestination from './components/trending-destinations/TrendingDetination';
import { useState, useEffect, useCallback } from 'react';
import { MAX_GUESTS_INPUT_VALUE } from 'utils/constants';
import { formatDate } from 'utils/date-helpers';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import apiService from 'services/request';
const Home = () => {
  const navigate = useNavigate();
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('Ha Noi');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const [DiscountHotelsData, setDiscountHotels] = useState([]);
  const [propertyType, setPropertType] = useState([]);
  const [locations, setLocations] = useState([]);
  const [popularDestinationsData, setPopularDestinationsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });
  // State for storing available cities
  const [availableCities, setAvailableCities] = useState([]);

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(_debounce(queryResults, 1000), []);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  const onLocationChangeInput = async (newValue) => {
    setLocationInputValue(newValue);
    debounceFn(newValue, availableCities);
  };

  function queryResults(query, availableCities) {
    const filteredResults = availableCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTypeheadResults(filteredResults);
  }

  const onNumGuestsInputChange = (numGuests) => {
    if (
      (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) ||
      numGuests === ''
    ) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const onDateChangeHandler = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const onSearchButtonAction = () => {
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateRange[0].startDate) ?? '';
    const checkOutDate = formatDate(dateRange[0].endDate) ?? '';
    const city = locationInputValue;
    navigate('/hotels', {
      state: {
        numGuest,
        checkInDate,
        checkOutDate,
        city,
      },
    });
  };

  useEffect(() => {
    const getInitialData = async () => {
      const popularDestinationsResponse = await apiService.get(
        '/api/popularDestinations'
      );
      const DiscountHotelsResponse = await apiService.post(
        '/api/discountHotels'
      );
      if (DiscountHotelsResponse.status === 200) {
        setDiscountHotels(DiscountHotelsResponse.data);
      }
      const propertyTypeResponse = await apiService.post('/api/propertyType');
      if (propertyTypeResponse.status === 200) {
        setPropertType(propertyTypeResponse.data);
      }
      const locationsResponse = await apiService.post('/api/locations');
      if (locationsResponse.status === 200) {
        setLocations(locationsResponse.data);
      }
      const availableCitiesResponse = await apiService.get(
        '/api/availableCities'
      );
      if (availableCitiesResponse) {
        setAvailableCities(availableCitiesResponse.data.elements);
      }

      if (popularDestinationsResponse) {
        setPopularDestinationsData({
          isLoading: false,
          data: popularDestinationsResponse.data.elements,
          errors: popularDestinationsResponse.errors,
        });
      }
    };
    getInitialData();
  }, []);
  return (
    <>
      <HeroCover
        locationInputValue={locationInputValue}
        numGuestsInputValue={numGuestsInputValue}
        locationTypeheadResults={filteredTypeheadResults}
        isDatePickerVisible={isDatePickerVisible}
        setisDatePickerVisible={setisDatePickerVisible}
        onLocationChangeInput={onLocationChangeInput}
        onNumGuestsInputChange={onNumGuestsInputChange}
        dateRange={dateRange}
        onDateChangeHandler={onDateChangeHandler}
        onDatePickerIconClick={onDatePickerIconClick}
        onSearchButtonAction={onSearchButtonAction}
      />

      <div className="container mx-auto">
        <PropertyType propertyType={propertyType} />
        <TrendingDestination
          popularDestinationsData={popularDestinationsData}
        />
        <TopDestinations locations={locations} />
        <DiscountHotels DiscountHotelsData={DiscountHotelsData} />
        <HotelImageWithText />
      </div>
    </>
  );
};

export default Home;
