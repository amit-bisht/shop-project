import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { listProducts } from "../../store/product-slice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>latest products</h1>
      {loading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
