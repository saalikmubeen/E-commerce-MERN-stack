import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader'
import CheckOutSteps from "../components/CheckOutSteps";
import { createOrder } from '../actions/orderActions';

const PlaceOrderPage = ({ history }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);
    const { cart, shippingAddress, paymentMethod } = cartItems;

    if (!shippingAddress) {
        history.push("/shipping");
    } else if (!paymentMethod) {
        history.push("/payment");
    } else if (cart.length === 0) {
        history.push("/cart");
    }

    //   Calculate prices

    cartItems.itemsPrice = cart.reduce((acc, next) => {
        return acc + (Number(next.qty) * Number(next.price)) 
    }, 0).toFixed(2);

    cartItems.shippingPrice = cartItems.itemsPrice > 100 ? 0 : 100;
    cartItems.taxPrice = Number((0.15 * cartItems.itemsPrice).toFixed(2))
    cartItems.totalPrice = ( Number(cartItems.itemsPrice) + Number(cartItems.shippingPrice) + Number(cartItems.taxPrice) ).toFixed(2)


    const handleClick = () => {
        const orderObj = {
            shippingAddress: shippingAddress, 
            paymentMethod: paymentMethod,
            itemsPrice: cartItems.itemsPrice,
            taxPrice: cartItems.taxPrice,
            shippingPrice: cartItems.shippingPrice,
            totalPrice: cartItems.totalPrice,
            orderItems: cart
        }

        dispatch(createOrder(orderObj));
    }

    const { loading, success, order, error } = useSelector((state) => state.createOrder);
    const { currentUser } = useSelector((state) => state.loginUser);

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }

        if (success) {
            dispatch({ type: "RESET_CART" });
            history.push(`/orders/${order._id}`);
        }
    }, [history, success, order, currentUser, dispatch])

    return (
        <>
            <CheckOutSteps step1 step2 step3 step4/>
            {loading ? <Loader /> :
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address:</strong>
                                    {shippingAddress.address}, {shippingAddress.city}{' '}
                                    {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                        <ListGroup variant='flush'>
                                            {cart.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>

                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cartItems.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cartItems.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cartItems.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${cartItems.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                        
                                <ListGroup.Item>
                                    <Button type='button' className='btn-block' disabled={cart.length === 0} onClick={handleClick}>
                                        Place Order
                        </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default PlaceOrderPage;
