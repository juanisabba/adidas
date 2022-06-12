import {createSlice} from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        products: localStorage.getItem("favorites") !== null ? JSON.parse(localStorage.getItem('favorites')) : [],
        quantity: localStorage.getItem("favorites") !== null ? JSON.parse(localStorage.getItem('favorites')).length : 0,
    },
    reducers: {
        addFavorite: (state, {payload})=>{
            state.quantity += 1       
            state.products.unshift(payload)
        },
        removeFavorite: (state, {payload})=>{
            state.quantity -= 1       
            state.products = payload
        },
    }
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions
export default favoritesSlice.reducer
