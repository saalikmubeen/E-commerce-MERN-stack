import React from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

const CartPage = ({ history }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartItems);
    const { currentUser } = useSelector((state) => state.loginUser);
    
    const proceedToCheckOut = () => { 
        if (!currentUser) {
            history.push("/login");
        } else {
            history.push("/shipping")
        }

    }

    return (
        <Row>
            <Meta title="Welcome to ShopLinee | My Cart"/>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? (
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
            ) : (
            <ListGroup variant='fluid'>
            {cart.map((item) => (
                <ListGroup.Item key={item._id}>
                    <Row>
                        <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))}>
                                {
                                    Array(item.countInStock).fill(0).map((ele, idx) => {
                                        return <option value={idx + 1} key={idx}>{ idx+1}</option>
                                    })
                                }
                        </Form.Control>
                        </Col>
                        <Col md={2}>
                            <Button type='button' variant='light' onClick={() => dispatch(removeFromCart(item._id))}>
                            <i className='fas fa-trash'></i>
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
            </ListGroup>
        )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5> Total Items: {cart.reduce((acc, next) => acc += Number(next.qty), 0)}</h5>
                            <h4>Total Price: ${ cart.reduce((acc, next) => acc += (Number(next.price) * Number(next.qty)), 0)}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.length === 0} onClick={proceedToCheckOut}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage