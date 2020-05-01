import * as types from '../actions/actionTypes';
import initialData from '../../initial_data';

const dataReducer = (state = initialData, action) => {
  switch (action.type) {
    case types.LOAD_DATA:
      return { ...state, ...action.initialData };
    case types.LOAD_DATA_SUCCESS:
      return { ...state, ...action.data };
    case types.MOVE_CARD_WITHIN_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.newList.listId]: action.newList,
        },
      };
    case types.MOVE_CARD_BETWEEN_LISTS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.newStart.listId]: action.payload.newStart,
          [action.payload.newFinish.listId]: action.payload.newFinish,
        },
      };
    default:
      return state;
  }
};
export default dataReducer;
