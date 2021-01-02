import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';


const Header = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);
    const { currentUser } = useSelector((state) => state.loginUser);
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
                        {currentUser ?
                            <NavDropdown title={currentUser.name} id='current user'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                            </LinkContainer>
                        }
                </Nav>
            </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}


export default Header;