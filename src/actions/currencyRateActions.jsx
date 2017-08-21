import * as types from '../constants/CurrencyRateActions';

export function setRates(rates, timestamp) {
  return { type: types.SET_RATES, rates, timestamp };
}