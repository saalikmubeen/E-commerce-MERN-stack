import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import CheckOutSteps from "../components/CheckOutSteps";
import { selectPaymentMethod } from '../actions/cartActions';


const PaymentMethodPage = ({ history }) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const { currentUser } = useSelector((state) => state.loginUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch((selectPaymentMethod(paymentMethod)));
        history.push("/placeOrder");
    }

    useEffect(() => {
        if (!currentUser) {
            history.push("/login");
        }
    }, [history, currentUser]);

    return (
        <>
        <CheckOutSteps step1 step2 step3/>
        <FormContainer>
            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked={paymentMethod === "PayPal"} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)} />
                    </Col>
            </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
        </>    
    )
}

export default PaymentMethodPage;
