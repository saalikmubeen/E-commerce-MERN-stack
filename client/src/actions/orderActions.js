import axios from 'axios';


const createOrder = (orderObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "CREATE_ORDER_REQUEST" })
        
            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { data } = await axios.post("/api/orders", orderObj, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data.order })
        } catch (err) {
            dispatch({type: "CREATE_ORDER_ERROR", payload: err.response ? err.response.data.error : err.message})
        }
    }
}


const getMyOrders = () => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "MY_ORDERS_REQUEST" });

            const { currentUser } = getState().loginUser;

            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { token } = currentUser;

            const { data } = await axios.get("/api/orders/myOrders", { headers: { Authorization: `Bearer ${token}` } });

            dispatch({ type: "MY_ORDERS_SUCCESS", payload: data.orders });
        } catch (err) {
            dispatch({ type: "MY_ORDERS_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


const orderDetails = (id) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "ORDER_DETAILS_REQUEST" });

            const { currentUser } = getState().loginUser;

            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { token } = currentUser;

            const { data } = await axios.get(`/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            
            if (data.error) {
                throw new Error(data.error);
            }

            dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.order });
        } catch (err) {
            dispatch({ type: "ORDER_DETAILS_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


const payOrder = (orderID, paymentResultObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "PAY_ORDER_REQUEST" });

            const { currentUser } = getState().loginUser;

            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { token } = currentUser;

            await axios.put(`/api/orders/${orderID}/pay`, { paymentResult: paymentResultObj }, { headers: { Authorization: `Bearer ${token}` } });

            dispatch({ type: "PAY_ORDER_SUCCESS"});
        } catch (err) {
            dispatch({ type: "PAY_ORDER_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const fetchOrderList = () => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "ORDER_LIST_REQUEST" })

            const { currentUser } = getState().loginUser;

            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { token } = currentUser;

            const { data } = await axios.get("/api/orders", { headers: { Authorization: `Bearer ${token}` } })

            dispatch({type: "ORDER_LIST_SUCCESS", payload: data.orders})

        } catch (err) {
            dispatch({ type: "ORDER_LIST_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const deliverOrder = (orderID) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "DELIVER_ORDER_REQUEST" });

            const { currentUser } = getState().loginUser;

            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { token } = currentUser;

            await axios.put(`/api/orders/${orderID}/delivered`, { }, { headers: { Authorization: `Bearer ${token}` } });

            dispatch({ type: "DELIVER_ORDER_SUCCESS"});
        } catch (err) {
            dispatch({ type: "DELIVER_ORDER_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}




export { createOrder, getMyOrders, orderDetails, payOrder, fetchOrderList, deliverOrder };
