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


export { createOrder };
