import axios from 'axios';
// const URL = 'https://hotel-booking-uedl.onrender.com';
const URL = 'http://localhost:3030';

const apiService = {
  async get(endpoint, params = {}) {
    try {
      const data = await axios(URL + endpoint, params);
      return data.data;
    } catch (error) {
      return error;
    }
  },
  async post(endpoint, params = {}) {
    try {
      const response = await axios.post(URL + endpoint, params);
      return response;
    } catch (error) {
      return error;
    }
  },
};
export default apiService;
