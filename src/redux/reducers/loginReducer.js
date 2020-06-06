import * as types from '../actions/actionTypes';

const courseReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_AUTH_STATUS:
      return { ...state, isAuthenticated: action.isAuthenticated };
    case types.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
export default courseReducer;
