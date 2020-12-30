const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const alreadyExists = state.some((item) => item._id === action.payload._id);

            if (alreadyExists) {
                return state.map((item) => {
                    if (item._id === action.payload._id) {
                        return { ...item, qty: action.payload.qty }
                    } else {
                        return item
                    }
                })
            }

            return [...state, action.payload]
        
        case "REMOVE_FROM_CART":
            return state.filter((item) => item._id !== action.id);
        default:
            return state
    }
};



export { cartReducer };