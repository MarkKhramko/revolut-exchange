import { 
	SET_TIMESTAMP,
	SET_RATES
} from '../constants/CurrencyRateActions';

const initialState = {
	timestamp: 0,
	rates: []
};

export default function currencyRate(state = initialState, action) {

  switch (action.type) {
    case SET_TIMESTAMP:
      return {
        timestamp: action.timestamp,
        rates: state.rates
      };
  	case SET_RATES:
      return {
        timestamp: state.timestamp,
        rates: action.rates
      };
    default:
      return state;
  }
}
