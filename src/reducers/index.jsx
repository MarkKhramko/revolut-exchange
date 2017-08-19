import { combineReducers } from 'redux';

import userAccount from './userAccount';
import currencyRate from './currencyRate';
import exchangeHistory from './exchangeHistory';

const rootReducer = combineReducers({
    userAccount,
    currencyRate,
    exchangeHistory
});

export default rootReducer;
