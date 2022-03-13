import React from "react";
import { Container,Navbar,Nav,Badge } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from "react-redux";
const Header = () => {
  const totalQuantity=useSelector((state)=>state.cart.totalQuantity)
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
            <LinkContainer to="/login">
              <Nav.Link><i className="fa-solid fa-user"></i> Login</Nav.Link>
            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
