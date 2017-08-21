import { 
	ADD_TRANSACTION
} from '../constants/ExchangeHistoryActions';

import {Currencies} from '../constants/Currencies';

import uuidv4 from 'uuid/v4';

const initialState = {
  transactions:[
    {
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    },{
      id: uuidv4(),
      from: Currencies[48],
      to: Currencies[4],
      reducedAmount: 200,
      receivedAmount: 155.99,
      timestamp: new Date()
    }
  ]
};

export default function exchangeHistory(state = initialState, action) {

  switch (action.type) {
    case ADD_TRANSACTION:
      let newTransactions = state.transactions;
      let transaction = {id: uuidv4(), ...action.transaction }
      newTransactions.unshift(transaction);
      return {
        transactions: newTransactions
      };
    default:
      return state;
  }
}
