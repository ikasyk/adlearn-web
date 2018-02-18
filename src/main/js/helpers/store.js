import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducers} from '../reducers'

import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));