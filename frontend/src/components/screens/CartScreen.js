import React, { useEffect } from "react";
import {
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../Message";
import { useSelector,useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";
const CartScreen = () => {
  let cartItems = null;
  const dispatch=useDispatch()

  cartItems=useSelector(state=>state.cart.cartItems)

  const deleteCartHandler=(id)=>{
    dispatch(cartAction.removeItem(id))
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length>0 &&
          <ListGroup variant="flush">
          {cartItems.map((product) => (
            <ListGroup.Item key={product._id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to="/">{product.name}</Link>
                </Col>
                <Col md={2}>{`$${product.price}`}</Col>
                <Col md={3}>
                  <Form.Select readOnly aria-label="Default select example" value={product.quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </Col>
                <Col md={1}>
                    <Button type="button" onClick={()=>{deleteCartHandler(product._id)}}variant="light"><i className="fa-solid fa-trash"></i></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        }    
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal(3)</h2>
              $12.00
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button type="button">Proceed to checkout</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
