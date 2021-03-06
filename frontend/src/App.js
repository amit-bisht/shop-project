import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import HomeScreen from "./components/screens/HomeScreen";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="py-5">
        <Container>
          <Route path="/" exact> 
            <HomeScreen />
          </Route>
          <Route path="/login">
            <LoginScreen/>
          </Route>
          <Route path="/register">
            <RegisterScreen/>
          </Route>
          <Route path="/product/:id">
            <ProductScreen/>
          </Route>
          <Route path="/cart">
            <CartScreen/>
          </Route>
          <Route path="/user/profile">
            <ProfileScreen/>
          </Route>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
