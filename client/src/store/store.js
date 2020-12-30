import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, productDetailReducer } from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const initialState = { cartItems: cart }

const store = createStore(
    combineReducers({
        productList: productListReducer,
        productDetail: productDetailReducer,
        cartItems: cartReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)


export default store;

