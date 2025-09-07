import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import requests from "../../api/apiClient"
import { toast } from "react-toastify"

const initialState = {
    cart: null,
    status: "idle"
}

export const addItemToCart = createAsyncThunk("cart/addItemToCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await requests.carts.addItem(productId, quantity)
        }
        catch (error) {
            console.log(error)
        }
    }
)
export const deleteItemFromCart = createAsyncThunk("cart/deleteItemFromCart",
    async ({ productId, quantity = 1, key = "" }) => {
        try {
            return await requests.carts.deleteItem(productId, quantity)
        }
        catch (error) {
            console.log(error)
        }
    }
)
export const getCart = createAsyncThunk("cart/getCart",
    async (_, thunkAPI) => {
        try {
            return await requests.carts.get()
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        clearCart: (state) => {
            state.cart = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.status = "pendingAdd" + action.meta.arg.productId
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload
            state.status = "idle"
        });
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle"
        });
        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            console.log(action)
            state.status = "pendingDelete" + action.meta.arg.productId + action.meta.arg.key
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload
            state.status = "idle"
        });
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle"
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload
        });
    }
})

export const { setCart, setStatus, clearCart } = cartSlice.actions
export default cartSlice.reducer