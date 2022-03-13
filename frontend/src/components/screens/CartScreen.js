import React from "react";
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
const CartScreen = () => {
  const products = [
    {
      _id: "1",
      name: "Airpods Wireless Bluetooth Headphones",
      image: "/images/airpods.jpg",
      price: 89.99,
      countInStock: 10,
    },
    {
      _id: "2",
      name: "iPhone 11 Pro 256GB Memory",
      image: "/images/phone.jpg",
      price: 599.99,
      countInStock: 0,
    },
    {
      _id: "3",
      name: "Cannon EOS 80D DSLR Camera",
      image: "/images/camera.jpg",
      price: 929.99,
      countInStock: 5,
    },
  ];
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush">
          {products.map((product) => (
            <ListGroup.Item key={product._id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link>{product.name}</Link>
                </Col>
                <Col md={2}>{`$${product.price}`}</Col>
                <Col md={3}>
                  <Form.Select aria-label="Default select example" value="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </Col>
                <Col md={1}>
                    <Button type="button" variant="light"><i className="fa-solid fa-trash"></i></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
