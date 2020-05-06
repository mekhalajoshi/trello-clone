/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import * as types from './actionTypes';
import initialData from '../../initial_data';
import * as dataApi from '../../api/dataAPIUtil';

export function loadData() {
  return { type: types.LOAD_DATA, initialData };
}
export function loadDataSuccess(data) {
  return { type: types.LOAD_DATA_SUCCESS, data };
}
export function addList(payload) {
  return { type: types.ADD_LIST, payload };
}
export function addCard(payload) {
  return { type: types.ADD_CARD, payload };
}
export function moveCardWithinList(newList) {
  return { type: types.MOVE_CARD_WITHIN_LIST, newList };
}
export function moveCardBetweenLists(payload) {
  return { type: types.MOVE_CARD_BETWEEN_LISTS, payload };
}

export function getUserData() {
  return function (dispatch) {
    return dataApi.getData().then((data) => {
      dispatch(loadDataSuccess(data));
    }).catch((error) => {
      // TODO: handle Error loadDataError
      throw error;
    });
  };
}
