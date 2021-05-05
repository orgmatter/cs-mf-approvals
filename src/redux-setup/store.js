import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const middleware = [thunk];
const initialState = {};

const composeEnhancer = window.__REDOX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

export const Store = createStore(rootReducer, initialState, composeEnhancer(
    applyMiddleware(...middleware)
));