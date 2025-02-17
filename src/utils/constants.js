/**
 * Maximum number of guests allowed in the input
 */
import {
  faUmbrellaBeach,
  faMotorcycle,
  faCity,
  faHeart,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';

export const MAX_GUESTS_INPUT_VALUE = 10;

/**
 * Messages related to user registration.
 */
export const REGISTRATION_MESSAGES = {
  SUCCESS: 'User created successfully. Redirecting to login...',
};

/**
 * Messages related to user login.
 */
export const LOGIN_MESSAGES = {
  FAILED: 'Please enter valid email and password',
};

/**
 * Represents the default tax details for hotel booking.
 */
export const DEFAULT_TAX_DETAILS = '+5% taxes and charges';

/**
 * Sorting filter labels
 */
export const SORTING_FILTER_LABELS = Object.freeze({
  PRICE_LOW_TO_HIGH: 'Price: Low to High',
  PRICE_HIGH_TO_LOW: 'Price: High to Low',
  RATING_LOW_TO_HIGH: 'Rating: Low to High',
  RATING_HIGH_TO_LOW: 'Rating: High to Low',
});
export const categories = [
  { id: 1, name: 'Beach', icon: faUmbrellaBeach },
  { id: 2, name: 'Outdoors', icon: faMotorcycle },
  { id: 3, name: 'City', icon: faCity },
  { id: 4, name: 'Romance', icon: faHeart },
  { id: 5, name: 'Relax', icon: faMugHot },
];
