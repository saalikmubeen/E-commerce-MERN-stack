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


export { createOrderReducer };