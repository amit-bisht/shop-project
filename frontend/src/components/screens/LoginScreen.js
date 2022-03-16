import React,{useReducer,useEffect} from 'react'
import {Link,Redirect,useHistory} from 'react-router-dom'
import {Form,Buttton,Row,Col,Button} from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import FormContainer from '../FormContainer'
import {useSelector,userDispatch, useDispatch} from 'react-redux'
import { userActions } from '../../store/user-slice'
import { login } from '../../store/user-slice'
import { userInfoStorage } from '../../store'
const initialState={
    email:"",
    password:""
}
const reducerFn=(state,action)=>{
    if(action.type=="email"){
        return{
            email:action.val,
            password:state.password
        }
    }
    if(action.type=="password"){
        return({
            email:state.email,
            password:action.val,
        })
    }
    return state
}

const LoginScreen=(props)=>{
    const history=useHistory()
    const[userState,userDispatch]=useReducer(reducerFn,initialState)
    const {loading,userInfo,error}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const submitHandler=(event)=>{
        event.preventDefault()
        dispatch(login(userState.email,userState.password))
        
    }
    useEffect(()=>{
        if(userInfo!=null){
           history.push("/")
        }
    },[userInfo,history])
    
    return(
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/> }
            <Form onSubmit={submitHandler} method="post" action='/'>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder='Enter email' value={userState.email} onChange={(event)=>{userDispatch({type:'email',val:event.target.value})}}/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder='Enter password' value={userState.password} onChange={(event)=>{userDispatch({type:'password',val:event.target.value})}}/>
                </Form.Group>
                <Button type="submit" className="my-2" variant="primary">Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer<Link to="/register">Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;