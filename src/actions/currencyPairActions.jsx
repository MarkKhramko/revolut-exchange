import * as types from '../constants/CurrencyPairActions';

export function addPair(fromCurrencyData, toCurrencyData) {
  return { type: types.SET_RATES, fromCurrencyData, toCurrencyData };
}