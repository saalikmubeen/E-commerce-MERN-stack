import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { orderDetails, payOrder, deliverOrder } from '../actions/orderActions';

const OrderDetailsPage = ({ match, history }) => {
    const dispatch = useDispatch();
    const { loading, error, order, success } = useSelector((state) => state.orderDetails); 
    const { loading: payOrderLoading, error: payOrderError, success: payOrderSuccess } = useSelector((state) => state.payOrder);
    const { loading: deliverOrderLoading, error: deliverOrderError, success: deliverOrderSuccess } = useSelector((state) => state.deliverOrder);
    const { currentUser } = useSelector((state) => state.loginUser);

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }

        if (!success) {
            dispatch(orderDetails(match.params.id));
        }

      if (success && order._id !== match.params.id) {
            dispatch(orderDetails(match.params.id));
      }

        if (payOrderSuccess) {
            dispatch(orderDetails(match.params.id));
            dispatch({ type: "PAY_ORDER_RESET" });
      }
      
      if (deliverOrderSuccess) {
        dispatch(orderDetails(match.params.id));
        dispatch({type: "DELIVER_ORDER_RESET"})
      }

    }, [dispatch, payOrderSuccess, match, success, history, currentUser, order, deliverOrderSuccess])

    const successPaymentHandler = (paymentResult) => {
        const paymentResultObj = {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.payer.email_address,
        }

        dispatch(payOrder(match.params.id, paymentResultObj));
    }
    
    
    const deliverOrderHandler = () => {
      dispatch(deliverOrder(match.params.id));
    }


    return (
        <>
            {deliverOrderError && <Message variant="danger">{deliverOrderError}</Message>}     
            {loading || payOrderLoading || deliverOrderLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : order && 
            <div>
            <h4>Order {order._id}</h4>    
            <Row>   
            <Col md={8}>         
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
                {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {String(order.paidAt).substring(0, 10)}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                    <ListGroup.Item>
                        {payOrderError && <Message variant="danger">{ payOrderError}</Message>}                    
                      <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                </ListGroup.Item>
              )}
              {currentUser &&
                currentUser.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
        </Row>
        </div>        
        }                
    </>
    )
}

export default OrderDetailsPage;
