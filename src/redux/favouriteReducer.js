import { Types } from './types';
const initState = [];
function favoriteReducer(state = initState, actions) {
  switch (actions.type) {
    case Types.addFavoriteHotel: {
      const exitingRoom = state.some((room) => {
        return room.id === actions.payload.id;
      });
      if (exitingRoom) {
        return state.filter((room) => {
          return room.id !== actions.payload.id;
        });
      }
      return [...state, actions.payload];
      // return [...state,actions.payload];
    }
    case Types.deleteFavoriteHotel: {
      return state.filter((room) => {
        return room.id !== actions.payload.id;
      });
    }
    default:
      return state;
  }
}

export default favoriteReducer;
