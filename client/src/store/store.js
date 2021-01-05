import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import { productListReducer, productDetailReducer, productDeleteReducer, productUpdateReducer, productCreateReducer } from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateReducer, userListReducer, userDeleteReducer, userUpdateReducerAdmin, userDetailsReducerAdmin } from '../reducers/userReducers';
import { createOrderReducer, myOrdersReducer, orderDetailsReducer, payOrderReducer } from '../reducers/orderReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : undefined;
const shippingAddress = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : undefined;
const paymentMethod = localStorage.getItem("paymentMethod");

const initialState = {
    cartItems: { cart: cart, shippingAddress: shippingAddress, paymentMethod: paymentMethod }, loginUser: { currentUser: user }
}

const store = createStore(
    combineReducers({
        productList: productListReducer,
        productDetail: productDetailReducer,
        cartItems: cartReducer,
        loginUser: userLoginReducer,
        registerUser: userRegisterReducer,
        userProfile: userProfileReducer,
        updateUser: userUpdateReducer,
        createOrder: createOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        payOrder: payOrderReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        updateUserAdmin: userUpdateReducerAdmin,
        userDetailsAdmin: userDetailsReducerAdmin,
        deleteProduct: productDeleteReducer,
        updateProduct: productUpdateReducer,
        createProduct: productCreateReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)


export default store;

