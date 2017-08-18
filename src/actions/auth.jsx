import * as types from '../constants/AuthActions';

export function setToken(token) {
  return { type: types.SET_TOKEN, token };
}