const productListReducer = (state = {  }, action) => {
    switch (action.type) {
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: [] };
        case "PRODUCT_LIST_SUCCESS":
            return { loading: false, products: action.payload }
        case "PRODUCT_LIST_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAIL_REQUEST":
            return { loading: true, product: {} };
        case "PRODUCT_DETAIL_SUCCESS":
            return { loading: false, product: action.payload, success: true }
        case "PRODUCT_DETAIL_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_DELETE_REQUEST":
            return {loading: true}
        case "PRODUCT_DELETE_SUCCESS":
            return { loading: true, success: true }
        case "PRODUCT_DELETE_ERROR":
            return { loading: false, error: action.payload }
        case "PRODUCT_DELETE_RESET":
            return {}
        default:
            return state
    }
}

const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_UPDATE_REQUEST":
            return {loading: true}
        case "PRODUCT_UPDATE_SUCCESS":
            return { loading: true, success: true }
        case "PRODUCT_UPDATE_ERROR":
            return { loading: false, error: action.payload }
        case "PRODUCT_UPDATE_RESET":
            return {}
        default:
            return state
    }
}

const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_CREATE_REQUEST":
            return {loading: true}
        case "PRODUCT_CREATE_SUCCESS":
            return { loading: true, success: true, product: action.payload }
        case "PRODUCT_CREATE_ERROR":
            return { loading: false, error: action.payload }
        case "PRODUCT_CREATE_RESET":
            return {}
        default:
            return state
    }
}


export { productListReducer, productDetailReducer, productDeleteReducer, productUpdateReducer, productCreateReducer };
