import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, productDetailReducer } from '../reducers/productReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        productList: productListReducer,
        productDetail: productDetailReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
)


export default store;

