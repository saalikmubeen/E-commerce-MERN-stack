import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress } from '../actions/cartActions';

const ShippingPage = ({ history }) => {
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector((state) => state.cartItems);

    const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "")
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "")
    const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : "")
    const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : "")

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary'> Continue </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingPage;
