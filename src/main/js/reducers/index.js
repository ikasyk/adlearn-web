import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {login} from './login.reducer';
import {reducer as form} from 'redux-form';

export const rootReducers = combineReducers({
    authentication,
    login,
    form
});