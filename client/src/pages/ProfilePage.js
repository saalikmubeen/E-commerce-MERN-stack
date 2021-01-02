import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfilePage = ({ history }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.userProfile);
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
    }, [dispatch, history, currentUser, userDetails])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords should match");
        } else {
            setMessage("");
            dispatch(updateUser({ name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                {loading && <Loader />}
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

                        <Button type='submit' variant='primary'> Update</Button>
                    </Form>
                }
            </Col>
        </Row>
    )
}

export default ProfilePage;
