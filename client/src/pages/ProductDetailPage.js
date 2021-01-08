import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProductDetail, createProductReview } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Meta from '../components/Meta';

const ProductDetailPage = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState("Select...")
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { currentUser } = useSelector((state) => state.loginUser);
    const { loading: loadingCreateReview, error: createReviewError, success: createReviewSuccess } = useSelector((state) => state.createProductReview)
    const { loading, product, error, success } = productDetail;

    useEffect(() => {
        if (!success || product._id !== match.params.id) {
            dispatch(fetchProductDetail(match.params.id));
        }

        if (createReviewSuccess) {
            dispatch(fetchProductDetail(match.params.id));
            dispatch({ type: "PRODUCT_REVIEW_CREATE_RESET" });
        }

        if (success && product._id !== match.params.id) {
             dispatch({ type: "PRODUCT_REVIEW_CREATE_RESET" });
        }

        if (!currentUser) {
             dispatch({ type: "PRODUCT_REVIEW_CREATE_RESET" });
        }

        
    }, [dispatch, match, createReviewSuccess, success, product._id, currentUser])

    const addToCartHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
        history.push("/cart");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createProductReview(match.params.id, { rating, comment }))
        
        setComment("")
        setRating("Select...")
    }

    return (
        <>
        { loading?<Loader/> : error ? <Message variant="danger">{error}</Message> :
            <div>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
            
                <Meta title={ product.name}/>

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
                    
                <Row>
                <Col md={6}>
                <h2 className="my-4">Reviews</h2>          
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {createReviewSuccess && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingCreateReview && <Loader />}
                  {createReviewError && (
                    <Message variant='danger'>{createReviewError}</Message>
                  )}
                  {currentUser ? (
                    <Form onSubmit={handleSubmit}>   
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                        as='select'
                        required                            
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required  
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingCreateReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>        
                </Row>
            </div>
            }
        </>
    )
}

export default ProductDetailPage
