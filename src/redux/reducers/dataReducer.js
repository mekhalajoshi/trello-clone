import * as types from '../actions/actionTypes';

const initialData = {
  courses: [],
  login: {},
  data: {
    cards: {},
    listIds: [],
    lists: {},
  },
};

const dataReducer = (state = initialData, action) => {
  switch (action.type) {
    case types.LOAD_DATA:
      return { ...state, ...action.initialData };
    case types.LOAD_DATA_SUCCESS:
      return { ...state, ...action.data };
    case types.ADD_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.newList.listId]: action.payload.newList,
        },
        listIds: [
          ...state.listIds.slice(0, state.listIds.length),
          action.payload.newList.listId,
        ],
      };
    case types.ADD_CARD:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.newList.listId]: action.payload.newList,
        },
        cards: {
          ...state.cards,
          [action.payload.card.cardId]: action.payload.card,
        },
      };
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
    case types.MOVE_LIST:
      return {
        ...state,
        listIds: action.payload.listIds,
      };
    case types.MOVE_LIST_GUEST:
      return {
        ...state,
        listIds: action.payload.listIds,
      };
    case types.MOVE_CARD_BETWEEN_LISTS_GUEST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.newStart.listId]: action.payload.newStart,
          [action.payload.newFinish.listId]: action.payload.newFinish,
        },
      };
    case types.MOVE_CARD_WITHIN_LIST_GUEST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.newList.listId]: action.newList,
        },
      };
    default:
      return state;
  }
};
export default dataReducer;
