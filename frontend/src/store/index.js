import {configureStore} from '@reduxjs/toolkit'
import productSlice from './product-slice';
import productDetailSlice from './product-detail-slice';
import cartSlice from './cart-slice';
import userSlice from './user-slice';

const store=configureStore({
    reducer:{
        'product':productSlice.reducer,
        'productDetail':productDetailSlice.reducer,
        'cart':cartSlice.reducer,
        'user':userSlice.reducer,
    }
})

const userInfoStorage=localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem("userInfo")):null

const initialState={
    userLogin:{
        userInfo:userInfoStorage
    }
}
export default store;