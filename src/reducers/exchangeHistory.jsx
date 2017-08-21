import { 
	ADD_TRANSACTION
} from '../constants/ExchangeHistoryActions';

import {Currencies} from '../constants/Currencies';

const initialState = {
  transactions:[
    {
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    },{
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      recievedAmount: 155.99,
      timestamp: new Date()
    }
  ]
};

export default function exchangeHistory(state = initialState, action) {

  switch (action.type) {
    case ADD_TRANSACTION:
      let newTransactions = state.transactions;
      newTransactions.unshift(action.transaction);
      return {
        transactions: newTransactions
      };
    default:
      return state;
  }
}
