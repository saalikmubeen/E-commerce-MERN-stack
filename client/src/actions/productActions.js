import axios from 'axios';

const fetchProductList = (keyword = "", page = 1) => {
    return async function (dispatch) {
        try {
            dispatch({ type: "PRODUCT_LIST_REQUEST" });


            const res = await axios.get(`/api/products?keyword=${keyword}&page=${page}`);
        
            dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: res.data.products, totalPages:  res.data.totalPages, page: res.data.page });
        
        } catch (err) {
            // console.log(err.response.data.error);
            dispatch({ type: "PRODUCT_LIST_ERROR", payload: err.response ? err.response.data.error : err.message });
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
            dispatch({ type: "PRODUCT_DETAIL_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const deleteProduct = (id) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "PRODUCT_DELETE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            await axios.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "PRODUCT_DELETE_SUCCESS"});
        } catch (err) {
            dispatch({ type: "PRODUCT_DELETE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const updateProduct = (id, productObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "PRODUCT_UPDATE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            const { data } = await axios.put(`/api/products/${id}`, productObj, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            if (data.error) {
                throw new Error(data.error)
            }

            dispatch({ type: "PRODUCT_UPDATE_SUCCESS"});
        } catch (err) {
            dispatch({ type: "PRODUCT_UPDATE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const createProduct = (name, email, password) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "PRODUCT_CREATE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            const { data } = await axios.post('/api/products', { }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` } });
            
            if (data.error) {
                throw new Error(data.error);
            }

            dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data.product })
            
        } catch (err) { 
            dispatch({ type: "PRODUCT_CREATE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


const createProductReview = (id, reviewObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "PRODUCT_REVIEW_CREATE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { data } = await axios.post(`/api/products/${id}/reviews`, reviewObj, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            if (data.error) {
                throw new Error(data.error)
            }

            dispatch({ type: "PRODUCT_REVIEW_CREATE_SUCCESS"});
        } catch (err) {
            dispatch({ type: "PRODUCT_REVIEW_CREATE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


export { fetchProductList, fetchProductDetail, deleteProduct, updateProduct, createProduct, createProductReview }