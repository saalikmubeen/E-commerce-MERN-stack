import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import SearchBox from './SearchBox';


const Header = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cartItems);
    const { currentUser } = useSelector((state) => state.loginUser);
    const items = cart && cart.length > 0 ? cart.length : undefined;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ShopLinee</Navbar.Brand>
                </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <SearchBox/>
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

                        {currentUser && currentUser.isAdmin &&
                            <NavDropdown title={`${currentUser.name} | Admin`} id='current user'>
                                <LinkContainer to='/admin/users'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/products'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orders'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                </Nav>
            </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}


export default Header;