import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    cartItems:[],
    totalQuantity:0,
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addItem(state,action){
            const newItem=action.payload
            const existingItem=state.cartItems.find((item)=>item._id==newItem._id)
            if(!existingItem){
                state.cartItems.push({_id:newItem._id,name:newItem.name,image:newItem.image,price:newItem.price,quantity:1})
                state.totalQuantity++;
            }
            else{
                existingItem.quantity++;
                state.totalQuantity++;
            }
        },
        removeItem(state,action){
            const existingItem=state.cartItems.filter((item)=>item._id!=action.payload)
            if(existingItem){
                state.cartItems=existingItem
                state.totalQuantity--
            }
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
export const cartAction=cartSlice.actions