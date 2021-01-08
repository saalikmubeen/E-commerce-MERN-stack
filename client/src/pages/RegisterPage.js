import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const LoginPage = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, currentUser } = useSelector((state) => state.registerUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords must match!")
        } else {
            setMessage("");
            dispatch(registerUser(name, email, password));
        }
    }

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history])

    
    return (
        <FormContainer>
            <Meta title="Welcome to ShopLinee | Register"/>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading ? <Loader /> :
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='confirm password'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>

                        <Button type='submit' variant='primary'> Sign Up </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            <p>Already have an account?</p>
                            <Link to="/login">
                                Log In
                    </Link>
                        </Col>
                    </Row>
                </>
            }
        </FormContainer>
    )
}

export default LoginPage;
