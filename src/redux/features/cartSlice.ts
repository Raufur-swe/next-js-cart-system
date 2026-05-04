import { AddToCartPayload, CartItem, CartState } from "@/src/types/cartType";
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


const initialState : CartState={
    items:[],
};

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers :{
        addToCart :(state , action : PayloadAction<AddToCartPayload>)=>{
            const exit = state.items.find(item=>item.id ===action.payload.id);
            if(exit){
                exit.quantity += 1;
            }else{
                state.items.push({
                    ...action.payload,
                    quantity : 1,
                })
            }
        },
        removeCart :(state , action : PayloadAction<number>)=>{
            state.items = state.items.filter(
                (item)=>item.id !== action.payload
            )
        },

        incresqty : (state , action : PayloadAction<number>)=>{
            const item = state.items.find((item)=>item.id === action.payload)
            if(item) item.quantity += 1;
        },

        decresqty : (state , action : PayloadAction<number>)=>{
            const item = state.items.find((item)=>item.id === action.payload)
            if(!item) return;
            if(item.quantity > 1){
                item.quantity -= 1;
            }else{
                state.items = state.items.filter((item)=>item.id !== action.payload)
            }
        },

        clearCart : (state)=>{
            state.items = [];
        }
    }
})

export const {addToCart , removeCart ,incresqty ,decresqty ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;