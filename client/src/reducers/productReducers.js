const productListReducer = (state = { products: [] }, action) => {
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
            return { loading: false, product: action.payload }
        case "PRODUCT_DETAIL_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export { productListReducer, productDetailReducer };
