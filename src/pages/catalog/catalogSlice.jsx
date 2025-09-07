import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

export const fetchProducts = createAsyncThunk(
    "catalog/fetchProducts",
    async () => {
        return await requests.products.list();
    }
);
export const fetchProductById = createAsyncThunk("catalog/fetchProductById",
    async (productId) => {
        return await requests.products.details(productId);
    })

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false
})

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "idle";
            state.isLoaded = "true";
            productsAdapter.setAll(state, action.payload)
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "pendingFetchProductById";
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = "idle";
            productsAdapter.upsertOne(state, action)
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "idle";
        });
    }
})

export const {
    selectById: selectProductById,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts
} = productsAdapter.getSelectors(state => state.catalog)

export default catalogSlice.reducer