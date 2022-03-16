import React,{useReducer,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import FormContainer from '../FormContainer'
import {useSelector,useDispatch} from 'react-redux'
import { register } from '../../store/register-slice'
const initalState={
    username:"",
    email:"",
    password:"",
    confirm_pasword:"",
    errorMessage:""
}
const reducerFn=(state,action)=>{
    if(action.type=="username"){
        return{
            username:action.val,
            email:state.email,
            password:state.password,
            confirm_pasword:state.confirm_pasword,
            errorMessage:state.errorMessage
        }
    }
    if(action.type=="email"){
        return{
            username:state.username,
            email:action.val,
            password:state.password,
            confirm_pasword:state.confirm_pasword,
            errorMessage:state.errorMessage
        }
    }
    if(action.type=="email"){
        return{
            username:state.username,
            email:action.val,
            password:state.password,
            confirm_pasword:state.confirm_pasword,
            errorMessage:state.errorMessage
        }
    }
    if(action.type=="password"){
        return{
            username:state.username,
            email:state.email,
            password:action.val,
            confirm_pasword:state.confirm_pasword,
            errorMessage:state.errorMessage
        }
    }
    if(action.type=="confirm-password"){
        return{
            username:state.username,
            email:state.email,
            password:state.password,
            confirm_pasword:action.val,
            errorMessage:state.errorMessage
        }
    }
    if(action.type=="error-message"){
        return{
            username:state.username,
            email:state.email,
            password:state.password,
            confirm_pasword:action.val,
            errorMessage:action.val
        }
    }


}
const RegisterScreen=()=>{
    const [userInfoState,dispatchUserInfo]=useReducer(reducerFn,initalState)
    const {loading,userInfo,error}=useSelector(state=>state.register)
    const dispatch=useDispatch()
    
    const submitHandler=(event)=>{
        event.preventDefault()
        console.log(userInfoState)
        if(userInfoState.password!=userInfoState.confirm_pasword){
            dispatchUserInfo({type:'error-message',val:"Password Do not match"})
        }
        // dispatch(register(userInfoState.username,userInfoState.email,userInfoState.password))
    }
    return(
        <FormContainer>
        <h1>Sign In</h1>
        {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/> }
        <Form onSubmit={submitHandler} method="post" action='/'>
            <Form.Group controlId='username'>
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control type="text" placeholder='Enter username' value={userInfoState.username} onChange={(event)=>{dispatchUserInfo({type:"username",val:event.target.value})}}/>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email address
                </Form.Label>
                <Form.Control type="email" placeholder='Enter email' value={userInfoState.email} onChange={(event)=>{dispatchUserInfo({type:"email",val:event.target.value})}} />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder='Enter password' value={userInfoState.password} onChange={(event)=>{dispatchUserInfo({type:"password",val:event.target.value})}}/>
            </Form.Group>
            <Form.Group controlId='confirm-password'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control type="password"  placeholder='Enter password again' value={userInfoState.confirm_password} onChange={(event)=>{dispatchUserInfo({type:"confirm-password",val:event.target.value})}} />
            </Form.Group>
            <Button type="submit" className="my-2" variant="primary">Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Already have account<Link to="/login">Login</Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default RegisterScreen