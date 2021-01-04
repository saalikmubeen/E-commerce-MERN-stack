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

const getUserList = () => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_LIST_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            const { data } = await axios.get("/api/users", { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_LIST_SUCCESS", payload: data.users });
        } catch (err) {
            dispatch({ type: "USER_LIST_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const deleteUser = (id) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_DELETE_REQUEST" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            await axios.delete(`/api/users/${id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_DELETE_SUCCESS"});
        } catch (err) {
            dispatch({ type: "USER_DELETE_ERROR", payload: err.response ? err.response.data.error : err.message });
        }
    }
}

const updateUserAdmin = (id, userObj) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_UPDATE_REQUEST_ADMIN" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

             if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            await axios.put(`/api/users/${id}`, userObj, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_UPDATE_SUCCESS_ADMIN" });
        } catch (err) {
            dispatch({ type: "USER_UPDATE_ERROR_ADMIN", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


const getUserDetails = (id) => {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: "USER_DETAILS_REQUEST_ADMIN" });

            const { currentUser } = getState().loginUser;
        
            if (!currentUser) {
                throw new Error("You are not logged in!")
            }

            if (currentUser && !currentUser.isAdmin) {
                throw new Error("You are not authorized as admin!")
            }

            const { data } = await axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${currentUser.token}` } });

            dispatch({ type: "USER_DETAILS_SUCCESS_ADMIN", payload: data.user });
        } catch (err) {
            dispatch({ type: "USER_DETAILS_ERROR_ADMIN", payload: err.response ? err.response.data.error : err.message });
        }
    }
}


export { loginUser, logoutUser, registerUser, getUserProfile, updateUser, getUserList, deleteUser, updateUserAdmin, getUserDetails };