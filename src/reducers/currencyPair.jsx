import uuidv4 from 'uuid/v4';
import { 
	ADD_PAIR
} from '../constants/CurrencyPairActions';

import {Currencies} from '../constants/Currencies';

const initialState = {
  pairs:[
    {
      fromCurrencyCode: Currencies[4].Code,
      toCurrencyCode: [48].Code
    },
    {
      fromCurrencyCode: [4].Code,
      toCurrencyCode: [69].Code
    }
  ]
};

export default function currencyPair(state = initialState, action) {

  switch (action.type) {
    case ADD_PAIR:
      let pairs = state.pairs;
      let newPair = {
        id: uuidv4(),
        fromCurrencyCode: action.fromCurrencyData.Code,
        toCurrencyCode: action.toCurrencyData.Code
      }
      pairs.push(newPair);
      return {
        pairs: pairs
      };
    default:
      return state;
  }
}
