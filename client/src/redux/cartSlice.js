import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem('cart')) : [],
        quantity: localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem('cart')).length : 0,
    },
    reducers: {
        addProduct: (state, {payload})=>{
            state.quantity += 1       
            state.products.push(payload)
        },
        removeProduct: (state, {payload})=>{
            state.quantity -= 1       
            state.products = payload
        },
        clearCart: (state, {payload})=>{
            state.quantity = 0       
            state.products = payload
        }
    }
})

export const {addProduct, removeProduct, clearCart} = cartSlice.actions
export default cartSlice.reducer
