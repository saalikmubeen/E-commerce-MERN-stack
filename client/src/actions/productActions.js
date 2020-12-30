import axios from 'axios';

const fetchProductList = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: "PRODUCT_LIST_REQUEST" });

            const res = await axios.get("/api/products");
        
            dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: res.data });
        } catch (err) {
            // console.log(err.response.data.error);
            dispatch({ type: "PRODUCT_LIST_ERROR", payload: err.response.data.error });
        }

    }
}

const fetchProductDetail = (productID) => {
    return async function (dispatch) {
        try {
            dispatch({ type: "PRODUCT_DETAIL_REQUEST" });

            const res = await axios.get(`/api/products/${productID}`);

            dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: res.data });

        } catch (err) {
            dispatch({ type: "PRODUCT_DETAIL_ERROR", payload: err.response.data.error });
        }
    }
}

export { fetchProductList, fetchProductDetail }