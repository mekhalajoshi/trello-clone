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
