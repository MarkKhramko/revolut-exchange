import { 
	ADD_AMOUNT,
	REDUCE_AMOUNT
} from '../constants/UserAccountActions';

const initialState = {
	amount:{
    GBP: 1001,
    USD: 1002,
    EUR: 1003
  }
};

export default function userAccount(state = initialState, action) {

  switch (action.type) {
    case ADD_AMOUNT:{
      console.log(action);
      let newAmount = {...state.amount};
      let currencyAmount = newAmount[action.currencyCode];
      newAmount[action.currencyCode] = currencyAmount + action.amount;
      return {
        amount: newAmount
      };
    }
  	case REDUCE_AMOUNT:{
      console.log(action);
      let newAmount = {...state.amount};
      let currencyAmount = newAmount[action.currencyCode];
      newAmount[action.currencyCode] = currencyAmount - action.amount;
      return {
        amount: newAmount
      };
    }
    default:
      return state;
  }
}
