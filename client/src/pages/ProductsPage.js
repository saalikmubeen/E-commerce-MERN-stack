import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProductList } from '../actions/productActions';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(fetchProductList());
    }, [dispatch])
    
    return (
        <div>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                <Row>
                    {products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })}
                </Row>
            }
        </div>
    )
}

export default ProductsPage
