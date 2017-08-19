import * as types from '../constants/CurrencyRateActions';

export function setTimestamp(timestamp) {
  return { type: types.SET_TIMESTAMP, timestamp };
}

export function setRates(rates) {
  return { type: types.SET_RATES, rates };
}