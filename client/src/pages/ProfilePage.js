import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUser } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const ProfilePage = ({ history }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);
    const {loading: loadingOrders, error: orderErrors, orders, success: orderSuccess} = useSelector((state) => state.myOrders)
    const { loading, userDetails, error } = userProfile;
    const { currentUser } = useSelector((state) => state.loginUser);
    const { success } = useSelector((state) => state.updateUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!currentUser) {
            history.push("/login")
        } else {
            if (userDetails) {
                setName(userDetails.name);
                setEmail(userDetails.email);
            } else {
                dispatch(getUserProfile())
            }
        }

        if (!orderSuccess) {
            dispatch(getMyOrders());
        }
    }, [dispatch, history, currentUser, userDetails, orderSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords should match");
        } else {
            setMessage("");
            dispatch(updateUser({ name, email, password }));
        }
    }

    return (
        <>
            <Meta title={ `${currentUser && currentUser.name} | Profile `}/>
            <Row>
                <Col>
                     {(loadingOrders || loading) && <Loader />}
                </Col>   
            </Row>    
        <Row>
            <Col md={3}>
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Profile updated successfully!</Message>}
                {error ? <Message variant="danger">{error}</Message> : userDetails &&
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>

                        <Button type='submit' variant='primary' className="mb-4"> Update</Button>
                    </Form>
                }
            </Col>

            <Col md={9}>
                <h3>My Orders</h3>
                {orderErrors ? (
                    <Message variant='danger'>{orderErrors}</Message>
                    ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                    </thead>
                                
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                                ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                                </td>
                            <td>
                            {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                            ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                            </td>
                            <td>
                            <LinkContainer to={`/orders/${order._id}`}>
                                <Button className='btn-sm' variant='light'> Details </Button>
                            </LinkContainer>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </Col>
        </Row>
        </>    
    )
}

export default ProfilePage;
