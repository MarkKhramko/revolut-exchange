import { 
	ADD_AMOUNT,
	REDUCE_AMOUNT
} from '../constants/UserAccountActions';

const initialState = {
	amount:{
    GBP: 10001,
    USD: 10002,
    EUR: 10003
  }
};

export default function userAccount(state = initialState, action) {

  switch (action.type) {
    case ADD_AMOUNT:{
      let newAmount = state.amount;
      let currencyAmount = newAmount[action.currencyCode];
      newAmount[action.currencyCode] = currencyAmount + action.amount;
      return newAmount;
    }
  	case REDUCE_AMOUNT:{
      let newAmount = state.amount;
      let currencyAmount = newAmount[action.currencyCode];
      newAmount[action.currencyCode] = currencyAmount - action.amount;
      return newAmount;
    }
    default:
      return state;
  }
}
