import React from "react";
import { Container,Navbar,Nav,Badge, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { logout } from "../store/user-slice";
const Header = () => {
  const userInfo=useSelector((state)=>state.user.userInfo)
  const dispatch=useDispatch()
  console.log(userInfo)
  const totalQuantity=useSelector((state)=>state.cart.totalQuantity)
  const logoutHandler=()=>{
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link><i className="fa-solid fa-cart-arrow-down"></i>Cart<span className="badge badge-light" style={{'fontSize':'15px'}}>{totalQuantity}</span></Nav.Link>
            </LinkContainer>
            {userInfo ? 
              <NavDropdown title={userInfo.username} id="username">
                <LinkContainer to='/user/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>  
            :
            <LinkContainer to="/login">
              <Nav.Link><i className="fa-solid fa-user"></i> Login</Nav.Link>
            </LinkContainer>
          }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
