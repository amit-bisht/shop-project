import FormContainer from "../FormContainer";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getUserDetails } from "../../store/profile-slice";
import Message from "../Message";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const ProfileScreen = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const { userProfileInfo, loading, error } = useSelector(state => state.profile)
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    const submitHandler = () => {
        return
    }
    useEffect(() => {
        console.log(userProfileInfo)
        if (!userInfo) {
            history.push("/login")
        }
        else {
            if (!userProfileInfo) {
                dispatch(getUserDetails(userInfo.id))
            }
            else {
                console.log(userProfileInfo)
                setUsername(userProfileInfo.username)
                setEmail(userProfileInfo.email)
                setPassword(userProfileInfo.password)
                setConfirmPassword(userProfileInfo.password)
            }
        }
        console.log(userProfileInfo)
    }, [dispatch,history, userInfo,userProfileInfo])
    return (
        <Row>
            <Col md={9}>
                <h2>User Profile</h2>
                <FormContainer>
                    <h1>Sign In</h1>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} method="post" action='/'>
                        <Form.Group controlId='username'>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control type="text" placeholder='Enter username' value={username} onChange={(event) => {setUsername(event.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>
                                Email address
                            </Form.Label>
                            <Form.Control type="email" placeholder='Enter email' value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='Enter password' value={password} onChange={(event)=>{setPassword(event.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId='confirm-password'>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='Enter password again' value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}} />
                        </Form.Group>
                        <Button type="submit" className="my-2" variant="primary">Update Profile</Button>
                    </Form>
                </FormContainer>
            </Col>
            <Col md={3}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
