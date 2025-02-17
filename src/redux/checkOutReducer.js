import { Types } from './types';
const initState = {};
function checkOutReducer(state = initState, actions) {
  switch (actions.type) {
    case Types.checkOut: {
      return actions.payload;
    }
    default:
      return state;
  }
}

export default checkOutReducer;
