import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProductDetail } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductDetailPage = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, product, error } = productDetail;

    useEffect(() => {
        dispatch(fetchProductDetail(match.params.id));
    }, [dispatch, match])

    const addToCartHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
        history.push("/cart");
    }


    return (
        <>
        { loading?<Loader/> : error ? <Message variant="danger">{error}</Message> :
            <div>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
            </Link>

                <Row>

                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                            {product.countInStock > 0 &&
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    Array(product.countInStock).fill(0).map((item, idx) => {
                                                        return <option value={idx + 1} key={idx}>{idx + 1}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>}   

                        <ListGroup.Item>
                            <Button
                                className='btn-block'
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={() => addToCartHandler(product._id, qty)}    
                            >
                                Add To Cart
                        </Button>
                        </ListGroup.Item>   
                            
                    </Col>

                </Row>
            </div>
            }
        </>
    )
}

export default ProductDetailPage
