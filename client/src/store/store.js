import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import { productListReducer, productDetailReducer } from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateReducer } from '../reducers/userReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : undefined;

const initialState = { cartItems: cart, loginUser: {currentUser: user} }

const store = createStore(
    combineReducers({
        productList: productListReducer,
        productDetail: productDetailReducer,
        cartItems: cartReducer,
        loginUser: userLoginReducer,
        registerUser: userRegisterReducer,
        userProfile: userProfileReducer,
        updateUser: userUpdateReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)


export default store;

