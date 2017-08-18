import * as types from '../constants/AuthActions';

export function setCurrentTab(token) {
  return { type: types.SET_TOKEN, token };
}