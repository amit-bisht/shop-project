import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    loading:null,
    userInfo:null,
    error:null,
}
const registerSlice=createSlice({
    name:'register',
    initialState:initialState,
    reducers:{
        userRegisterRequest(state,action){
            state.loading=true
            state.error=null
        },
        userRegisterSuccess(state,action){
            state.loading=null
            state.error=null
            state.userInfo=action.payload
        },
        userRegisterFail(state,action){
            state.loading=false
            state.error=action.payload
        }
    }
})
export const register=(username,email,userpassword)=>{
    return async(dispatch)=>{
            try{
                dispatch(registerAction.userRegisterRequest)
                const config={
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const response=await axios.post("http://127.0.0.1:8000/api/users/register/",{
                    username:email,
                    email:email,
                    password:userpassword
                },config)
                console.log(response)
                dispatch(registerAction.userRegisterSuccess(response.data))
                // localStorage.setItem("registerUserInfo",JSON.stringify(response.data))
            }catch(error){
                console.log(error)
                dispatch(registerAction.userRegisterFail(error.response && error.response.data.detail ? error.response.data.detail:error.message))
            }
    }
}
export default registerSlice
export const registerAction=registerSlice.actions