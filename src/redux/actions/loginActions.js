/* eslint-disable import/prefer-default-export */
import * as types from './actionTypes';

export function setAuthStatus(isAuthenticated) {
  return { type: types.SET_AUTH_STATUS, isAuthenticated };
}

export function setUser(user) {
  return { type: types.SET_USER, user };
}
