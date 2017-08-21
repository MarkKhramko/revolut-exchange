import { combineReducers } from 'redux';

import userAccount from './userAccount';
import currencyPair from './currencyPair';
import currencyRate from './currencyRate';
import exchangeHistory from './exchangeHistory';

const rootReducer = combineReducers({
    userAccount,
    currencyPair,
    currencyRate,
    exchangeHistory
});

export default rootReducer;
