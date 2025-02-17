import { Types } from './types';
const initState = {
  authCheck: false,
};
function authReducer(state = initState, actions) {
  switch (actions.type) {
    case Types.login: {
      return { user: actions.payload, authCheck: true };
    }
    case Types.logOut: {
      return { auth: false };
    }
    default:
      return state;
  }
}

export default authReducer;
