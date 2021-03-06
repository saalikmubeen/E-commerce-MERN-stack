import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

function App() {
  return (
    <div className="App">
        <Header />
        <main className="py-3">
            <Container>
                <Switch>
                    <Route path="/" exact component={ProductsPage} />       
                    <Route path="/product/:id" exact component={ProductDetailPage} />
                    <Route path="/cart/:id?" exact component={CartPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/shipping" exact component={ShippingPage} />
                    <Route path="/payment" exact component={PaymentMethodPage} />
                    <Route path="/placeOrder" exact component={PlaceOrderPage} />
                    <Route path="/orders/:id" exact component={OrderDetailsPage} />
                    <Route path="/admin/users" exact component={UserListPage} />
                    <Route path="/admin/users/:id/edit" exact component={UserEditPage} />
                    <Route path="/admin/products" exact component={ProductListPage} />
                    <Route path="/admin/products/:id/edit" exact component={ProductEditPage} />
                    <Route path="/admin/orders" exact component={OrderListPage} />
            
                    <Route path="/search/:keyword" exact component={ProductsPage} />    
                    <Route path="/page/:pageNumber" exact component={ProductsPage} />  
                    <Route path="/search/:keyword/page/:pageNumber" exact component={ProductsPage} />    
                    <Route path="/admin/products/:pageNumber" exact component={ProductListPage} />
                </Switch>       
            </Container>
        </main>
        <Footer/>     
    </div>
  );
}

export default App;
