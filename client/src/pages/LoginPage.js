import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginPage = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, currentUser } = useSelector((state) => state.loginUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(loginUser(email, password));
    }


    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history])


    return (
        <FormContainer>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? <Loader /> :
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button type='submit' variant='primary'> Sign In </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            <p>Create Account?</p>
                            <Link to="/register">
                                Register
                    </Link>
                        </Col>
                    </Row>
                </>}        
        </FormContainer>
    )
}

export default LoginPage;
