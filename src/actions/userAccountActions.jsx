import * as types from '../constants/UserAccountActions';

export function addAmount(amount, currencyCode) {
  return { type: types.ADD_AMOUNT, amount, currencyCode };
}

export function reduceAmount(amount, currencyCode) {
  return { type: types.REDUCE_AMOUNT, amount, currencyCode };
}