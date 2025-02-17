import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from 'routes/layouts/base-layout/BaseLayout';
import Home from 'routes/home/Home';
import HotelsSearch from 'routes/listings/HotelsSearch';
import UserProfile from 'routes/user-profile/UserProfile';
import HotelDetails from 'routes/hotel-details/HotelDetails';
import Favorite from 'routes/favourite/Favourite';
import AboutUs from 'routes/about-us/AboutUs';
import Login from 'routes/login/Login';
import Register from 'routes/register/Register';
import ForgotPassword from 'routes/forgot-password/ForgotPassword';
import Checkout from 'routes/checkout/Checkout';
import BookingConfirmation from 'routes/booking-confimation/BookingConifrmation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<HotelsSearch />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="hotel/:hotelId" element={<HotelDetails />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="booking-confirmation"
            element={<BookingConfirmation />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
