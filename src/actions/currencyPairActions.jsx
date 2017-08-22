import * as types from '../constants/CurrencyPairActions';

export function addPair(fromCurrencyData, toCurrencyData) {
  return { type: types.ADD_PAIR, fromCurrencyData, toCurrencyData };
}