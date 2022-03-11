import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../Rating";
import React from "react";
const ProductScreen = () => {
  const [product,setProduct]=useState("")
  const params = useParams();
  const id = params.id;
  
  useEffect(()=>{
    async function fetchProduct(){
      const response=await axios.get(`http://127.0.0.1:8000/api/product/${id}`)
      console.log(response.data)
      setProduct(response.data)
    }
    fetchProduct()
  },[])
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <div>
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
                  <Button disabled={product.countInStock==0} type="button">Add to Cart</Button>
                </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div> 
    </div>
  );
};

export default ProductScreen;
