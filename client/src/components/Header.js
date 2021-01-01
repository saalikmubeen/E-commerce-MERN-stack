import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';


const Header = () => {
    const cartItems = useSelector((state) => state.cartItems);
    const items = cartItems && cartItems.length > 0 ? cartItems.length : undefined;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>E-commerce App</Navbar.Brand>
                </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/cart" className="cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>
                                  Cart {items && <span className="notification">{items}</span>}
                            </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                    </LinkContainer>    
                </Nav>
            </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}


export default Header;