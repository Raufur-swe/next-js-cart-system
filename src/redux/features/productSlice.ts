import { getProductes } from "@/src/api/productFetch";
import { productType } from "@/src/types/productType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// product State structure
interface productState{
    products : productType[] // store fatched data
    loading: boolean;
    error: string | null; // api fall massaage
    lastFetched : number | null  // last time data fetched . this for caching
}

// define the initial state
const initialState : productState={
    products : [],
    loading : false ,
    error : null ,
    lastFetched : null
}

// fetching data api key with asyncthunc for pending fulfilled and rejected state 
export const fetchProducts = createAsyncThunk<productType[]>(
    "products/fetchProducts",
            async ()=> {
        const data = await getProductes() ;
        return data
    }
);

// creating slice
const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},

    extraReducers : (builder)=>{
        builder
        // for call start
        .addCase(fetchProducts.pending,(state , action)=>{
            state.loading = true;
            state.error = null; 
        })

        // api success 
        .addCase(fetchProducts.fulfilled,(state , action)=>{
            state.loading = false;
            state.products = action.payload
            // save the curent timestamp for caching
            state.lastFetched = Date.now()
        })
        // if api fail

        .addCase(fetchProducts.rejected,(state , action)=>{
            state.loading = false;
            state.error = "Internal server"
        })
    },


})

export default productSlice.reducer