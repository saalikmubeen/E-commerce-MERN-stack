import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import { selectPaymentMethod } from '../actions/cartActions';


const PaymentMethodPage = ({ history }) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch((selectPaymentMethod(paymentMethod)));
        history.push("/placeOrder");
    }

    return (
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
    )
}

export default PaymentMethodPage;
