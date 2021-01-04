const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { loading: true }
        case "LOGIN_SUCCESS":
            return { loading: false, currentUser: action.payload }
        case "LOGIN_ERROR":
            return { loading: false, error: action.payload }
        case "LOGOUT_USER":
            return {}
        default: 
            return state
    }
};


const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return { loading: true }
        case "REGISTER_SUCCESS":
            return { loading: false, currentUser: action.payload }
        case "REGISTER_ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
};


const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_PROFILE_REQUEST":
            return { loading: true }
        case "USER_PROFILE_SUCCESS":
            return { loading: false,  userDetails: action.payload }
        case "USER_PROFILE_ERROR":
            return { loading: false, error: action.payload }
        case "USER_PROFILE_RESET":
            return {}
        default:
            return state
    }
}

const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_UPDATE_REQUEST":
            return { loading: true }
        case "USER_UPDATE_SUCCESS":
            return { loading: false, success: true, updatedUser: action.payload }
        case "USER_UPDATE_ERROR":
            return { loading: false, error: action.payload }
        case "USER_UPDATE_RESET":
            return {}
        default:
            return state
    }
}


const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case "USER_LIST_REQUEST":
            return { loading: true }
        case "USER_LIST_SUCCESS":
            return { loading: false, success: true, users: action.payload }
        case "USER_LIST_ERROR":
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_DELETE_REQUEST":
            return { loading: true }
        case "USER_DELETE_SUCCESS":
            return { loading: false, success: true }
        case "USER_DELETE_ERROR":
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

const userUpdateReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case "USER_UPDATE_REQUEST_ADMIN":
            return { loading: true }
        case "USER_UPDATE_SUCCESS_ADMIN":
            return { loading: false, success: true }
        case "USER_UPDATE_ERROR_ADMIN":
            return { loading: false, error: action.payload }
        case "USER_UPDATE_RESET_ADMIN":
            return {}
        default:
            return state
    }
}

const userDetailsReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case "USER_DETAILS_REQUEST_ADMIN":
            return { loading: true }
        case "USER_DETAILS_SUCCESS_ADMIN":
            return { loading: false, user: action.payload }
        case "USER_DETAILS_ERROR_ADMIN":
            return { loading: false, error: action.payload }
        case "USER_DETAILS_RESET_ADMIN":
            return {}
        default:
            return state
    }
}


export { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateReducer, userListReducer, userDeleteReducer, userUpdateReducerAdmin, userDetailsReducerAdmin };


