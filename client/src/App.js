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
                    <Route path="/profile" exact component={ ProfilePage}/>
                </Switch>       
            </Container>
        </main>
        <Footer/>     
    </div>
  );
}

export default App;
