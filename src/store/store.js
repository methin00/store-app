import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../pages/cart/cartSlice"
import catalogReducer from "../pages/catalog/catalogSlice"
import accountReducer from "../pages/account/accountSlice.jsx"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        catalog: catalogReducer,
        account: accountReducer
    }
})