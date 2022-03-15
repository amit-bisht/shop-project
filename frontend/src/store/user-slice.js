import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    loading:null,
    userInfo:null,
    error:null,
}
const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        userLoginRequest(state,action){
            state.loading=true
            state.userInfo=null
            state.error=null
        },
        userLoginSuccess(state,action){
            state.loading=false
            state.userInfo=action.payload
            state.error=null
        },
        userLoginFail(state,action){
            state.loading=false
            state.userInfo=null
            state.error=action.payload
        },
        userLogout(state,action){
            state.loading=null
            state.userInfo=null
            state.error=null
        }
    }
})

export const login=(email,password)=>{
    return async(dispatch)=>{
        async function userLogin(){
            try{
                dispatch(userActions.userLoginRequest)
                const config={
                    headers:{
                        'Content-type':'application-json'
                    }
                }
                const response=await axios.get("http://127.0.0.1:8000/api/users/token/",{
                    username:email,
                    password:password
                },config)
                console.log(response)
                dispatch(userActions.userLoginSuccess(response.data))
                localStorage.setItem("userInfo",JSON.stringify(response.data))
            }catch(error){
                console.log(error)
                dispatch(userActions.userLoginFail(error.response && error.response.data.detail ? error.response.data.detail:error.message))
            }
        }
        userLogin();
    }
}
export default userSlice
export const userActions=userSlice.actions