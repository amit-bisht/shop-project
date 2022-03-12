import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    cartItems:[]
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addItem(state,action){
            state.cartItems.push(action.payload)
        }
    }
})

export const addToCart=(id)=>{
    return async (dispatch)=>{
        async function fetchProduct(){
            try{
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/product/${id}`
                  );
                console.log(response.data)
                const cartData={
                    id:response.data.id,
                    name:response.data.name,
                    image:response.data.image, 
                    price:response.data.price,
                    countInStock:response.data.countInStock,
                }
                dispatch(cartAction.addItem(cartData))
                localStorage.setItem("cartItems",cartData)
            }catch(error){
                console.log(error)
            }
        }
        fetchProduct()
    }
}
export default cartSlice
const cartAction=cartSlice.actions