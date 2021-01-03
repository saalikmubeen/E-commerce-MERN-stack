const cartReducer = (state = { cart: [], shippingAddress: {}, paymentMethod: "" }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const alreadyExists = state.cart.some((item) => item._id === action.payload._id);

            if (alreadyExists) {
                const cartItems = state.cart.map((item) => {
                    if (item._id === action.payload._id) {
                        return { ...item, qty: action.payload.qty }
                    } else {
                        return item
                    }
                })
                return { cart: cartItems };
            }

            return { ...state, cart: [...state.cart, action.payload] }
        
        case "REMOVE_FROM_CART":
            const updatedItems = state.cart.filter((item) => item._id !== action.id);
            return { cart: updatedItems }
        
        case "RESET_CART":
            return { ...state, cart: [] }
        
        case "ADD_SHIPPING_ADDRESS":
            return { ...state, shippingAddress: action.payload }
        
        case "SELECT_PAYMENT_METHOD":
            return {...state, paymentMethod: action.payload}
        default:
            return state
    }
};



export { cartReducer };