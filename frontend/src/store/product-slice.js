import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    products:[],
    loading:null,
    error:null
}
const productSlice=createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        productListRequest(state){
            state.products=[]
            state.loading=true
        },
        productListSuccess(state,action){
            state.products=action.payload
            state.loading=false
        },
        productListFail(state,action){
            state.loading=false
            state.error=action.payload

        }
    }

})

export const listProducts=()=>{
    return async (dispatch)=>{
        async function fetchProducts(){
            try{
                dispatch(productSlice.actions.productListRequest())
                const response=await axios.get("http://127.0.0.1:8000/api/products/")
                console.log(response)
                dispatch(productSlice.actions.productListSuccess(response.data))
            }catch(error){
                console.log(error)
                dispatch(productSlice.actions.productListFail(error.response && error.response.data.message ? error.response.data.message:error.message))
            }
        }
        fetchProducts()
    }
}
export default productSlice
export const productActions=productSlice.actions