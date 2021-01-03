import axios from 'axios';

const loginUser = (email, password) => {
    return async function (dispatch) {
        try {
            dispatch({ type: "LOGIN_REQUEST" });

            const { data } = await axios.post('/api/users/login', { email, password }, { headers: { 'Content-Type': 'application/json' } });
            
            if (data.error) {
                throw new Error(data.error);
            }

            dispatch({ type: "LOGIN_SUCCESS", payload: data.user })
            
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            
        } catch (err) { 
            dispatch({ type: "LOGIN_ERROR", payload: err.message });
        }
    }
}

const logoutUser = () => {
    return async function (dispatch) {
        dispatch({ type: "LOGOUT_USER" });

        dispatch({ type: "USER_UPDATE_RESET" });

        dispatch({ type: "USER_PROFILE_RESET" });

        dispatch({ type: "ORDER_DETAILS_RESET" });

        dispatch({ type: "MY_ORDERS_RESET" });

        localStorage.removeItem("currentUser");
    }
}

const registerUser = (name, email, password) => {
    return async function (dispatch) {
        try {
            dispatch({ type: "REGISTER_REQUEST" });

            const { data } = await axios.post('/api/users', { name, email, password }, { headers: { 'Content-Type': 'application/json' } });
            
            if (data.error) {
                throw new Error(data.error);
            }

            dispatch({ type: "REGISTER_SUCCESS", payload: data.user })

            dispatch({ type: "LOGIN_SUCCESS", payload: data.user })
            
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            
        } catch (err) { 
            dispatch({ type: "REGISTER_ERROR", payload: err.message });
        }
    }
}

const getUserProfile = () => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_PROFILE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { data } = await axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_PROFILE_SUCCESS", payload: data.user });
        } catch (err) {
            dispatch({ type: "USER_PROFILE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


const updateUser = (userObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_UPDATE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            const { data } = await axios.put("/api/users/profile", userObj, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_UPDATE_SUCCESS", payload: data.user });
            dispatch({ type: "USER_PROFILE_SUCCESS", payload: data.user });
        } catch (err) {
            dispatch({ type: "USER_UPDATE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


export { loginUser, logoutUser, registerUser, getUserProfile, updateUser };