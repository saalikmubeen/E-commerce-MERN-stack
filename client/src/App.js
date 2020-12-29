import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="App">
        <Header />
        <main className="py-3">
            <Container>
                <Switch>
                    <Route path="/" exact component={ProductsPage} />
                    <Route path="/product/:id" exact component={ ProductDetailPage}/>
                </Switch>       
            </Container>
        </main>
        <Footer/>     
    </div>
  );
}

export default App;
