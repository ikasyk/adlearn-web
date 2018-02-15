import {createStore, applyMiddleware} from 'redux';
import {rootReducers} from '../reducers'

import thunkMiddleware from 'redux-thunk';

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));