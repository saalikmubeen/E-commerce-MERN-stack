import axios from 'axios';

const addToCart = (id, qty) => {
    return async function (dispatch, getState) {
        const { data } = await axios.get(`/api/products/${id}`);
        const product = {
            _id: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description,
            brand: data.brand,
            category: data.category,
            countInStock: data.countInStock,
            qty: qty
        }

        dispatch({ type: "ADD_TO_CART", payload: product });
        
        localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
    }
}

const removeFromCart = (id) => {
    return async function (dispatch, getState) {
        dispatch({ type: "REMOVE_FROM_CART", id: id })
        
        localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
    }
}

export { addToCart, removeFromCart };