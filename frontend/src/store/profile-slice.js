import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    userProfileInfo:null,
    loading:null,
    error:null
}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        updateProfileRequest(state,action){
            state.loading=true
            state.error=null
        },
        updateProfileSuccess(state,action){
            state.userProfileInfo=action.payload
            state.loading=false
            state.error=false
        },
        updateProfileFail(state,action){
            state.loading=false
            state.error=action.payload
        },
        userDetials(state,action){
            state.userProfileInfo=action.payload
            state.loading=false
            state.error=false

        }
    }
})
export const getUserDetails=(id)=>{
    return async(dispatch)=>{
        try{
            dispatch(profileAction.updateProfileRequest())
            const tokenKey=JSON.parse(window.localStorage.getItem('userInfo'))
            const config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${tokenKey.access}`
                }
            }
           console.log(tokenKey.access)
            const response=await axios.get(`http://127.0.0.1:8000/api/users/profile/${id}`,config)
            dispatch(profileAction.userDetials(response.data))
            console.log(response)
        }catch(error){
            console.log(error)
            dispatch(profileAction.updateProfileFail(error.response && error.response.data.detail ? error.response.data.detail:error.message))
        }
    }

}
export const updateProfile=(email,password)=>{
    return async(dispatch)=>{
        try{
            dispatch(profileAction.updateProfileRequest())
            const tokenKey=localStorage.getItem('userInfo')
            console.log(tokenKey)
            const config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${tokenKey.access}`
                }
            }
            const response=await axios.put("http://127.0.0.1:8000/api/users/update/profile/",{
                    username:email,
                    email:email,
                    password:password
                },config)
                console.log(response)
            dispatch(profileAction.updateProfileSuccess(response.data))
        }catch(error){
            console.log(error)
            dispatch(profileAction.updateProfileFail(error.response && error.response.data.detail ? error.response.data.detail:error.message))
        }
    }
}

export default profileSlice
export const profileAction=profileSlice.actions