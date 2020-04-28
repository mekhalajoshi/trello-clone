import * as types from '../actions/actionTypes';
import initialData from '../../initial_data';

const dataReducer = (state = initialData, action) => {
  switch (action.type) {
    case types.LOAD_DATA:
      return { ...state, ...action.initialData };
    case types.LOAD_DATA_SUCCESS:
      return { ...state, ...action.data };
    case types.SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
export default dataReducer;
