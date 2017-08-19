import * as types from '../constants/ExchangeHistoryActions';

export function addTransaction(transaction) {
  return { type: types.ADD_TRANSACTION, transaction };
}