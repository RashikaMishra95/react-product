import {combineReducers} from 'redux';
import {productsReducer} from './product.reducer';

const appReducer = combineReducers({
    productsReducer
});
export default appReducer;