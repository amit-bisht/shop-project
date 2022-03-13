import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card
} from "react-bootstrap";

import Rating from "../Rating";
import { fetchProduct } from "../../store/product-detail-slice";
import Loader from "../Loader";
import Message from "../Message";
import { cartAction } from "../../store/cart-slice";

const ProductScreen = () => {
  const dispatch = useDispatch();
  let { product, loading, error } = useSelector((state) => state.productDetail);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);
  
  const addCartHandler=()=>{
    dispatch(cartAction.addItem({_id:product._id,name:product.name,image:product.image,price:product.price}))
  }
  
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Link to="/product/10" className="btn btn-light my-3">
        Test Link
      </Link>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          product && (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} ratings`}
                      color="#f8e825"
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price:${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description:${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Stock:</Col>
                        {product.countInStock > 0 ? (
                          <Col>'In Stock'</Col>
                        ) : (
                          <Col>'Out of stock'</Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <div className="d-grid gap-2">
                          <Button
                            disabled={product.countInStock == 0}
                            type="button"
                            onClick={addCartHandler}
                          >
                            Add to Cart
                          </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
