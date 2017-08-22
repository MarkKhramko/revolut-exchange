import uuidv4 from 'uuid/v4';
import { 
	ADD_PAIR
} from '../constants/CurrencyPairActions';

import {Currencies} from '../constants/Currencies';

const initialState = {
  pairs:[
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[48]
    },
    {
      id: uuidv4(),
      fromCurrency: Currencies[4],
      toCurrency: Currencies[20]
    },
  ]
};

export default function currencyPair(state = initialState, action) {

  switch (action.type) {
    case ADD_PAIR:
      let pairs = state.pairs;
      let newPair = {
        id: uuidv4(),
        fromCurrency: action.fromCurrencyData,
        toCurrency: action.toCurrencyData
      }
      pairs.push(newPair);
      return {
        pairs: pairs
      };
    default:
      return state;
  }
}
