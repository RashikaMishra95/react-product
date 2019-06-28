import appReducer from '../reducers/index';
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export const configureStore = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware),

);