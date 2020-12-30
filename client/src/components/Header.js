import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>E-commerce App</Navbar.Brand>
                </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
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