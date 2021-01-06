const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ORDER_REQUEST":
            return { loading: true }
        case "CREATE_ORDER_SUCCESS":
            return { loading: false, success: true, order: action.payload }
        case "CREATE_ORDER_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const myOrdersReducer = (state = {}, action) => {
    switch (action.type) {
        case "MY_ORDERS_REQUEST":
            return { loading: true }
        case "MY_ORDERS_SUCCESS":
            return { loading: false, success: true, orders: action.payload }
        case "MY_ORDERS_ERROR":
            return { loading: false, error: action.payload }
        case "MY_ORDERS_RESET":
            return {}
        default: 
            return state
    }
}

const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case "ORDER_DETAILS_REQUEST":
            return { loading: true }
        case "ORDER_DETAILS_SUCCESS":
            return { loading: false, success: true, order: action.payload }
        case "ORDER_DETAILS_ERROR":
            return { loading: false, error: action.payload }
        case "ORDER_DETAILS_RESET":
            return {}
        default: 
            return state
    }
}

const payOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case "PAY_ORDER_REQUEST":
            return { loading: true };
        case "PAY_ORDER_SUCCESS":
            return { loading: false, success: true }
        case "PAY_ORDER_ERROR":
            return { loading: false, error: action.payload }
        case "PAY_ORDER_RESET":
            return {}
        default:
            return state;
    }
}

const orderListReducer = (state = {}, action) => {
    switch (action.type) {
        case "ORDER_LIST_REQUEST":
            return { loading: true }
        case "ORDER_LIST_SUCCESS":
            return { loading: false, orders: action.payload }
        case "ORDER_LIST_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const deliverOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case "DELIVER_ORDER_REQUEST":
            return { loading: true };
        case "DELIVER_ORDER_SUCCESS":
            return { loading: false, success: true }
        case "DELIVER_ORDER_ERROR":
            return { loading: false, error: action.payload }
        case "DELIVER_ORDER_RESET":
            return {}
        default:
            return state;
    }
}



export { createOrderReducer, myOrdersReducer, orderDetailsReducer, payOrderReducer, orderListReducer, deliverOrderReducer };