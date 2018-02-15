import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {login} from './login.reducer';

export const rootReducers = combineReducers({
    authentication,
    login
});