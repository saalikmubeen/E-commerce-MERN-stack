import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProductList } from '../actions/productActions';
import Paginate from '../components/Paginate';
import ProductCarousel from "../components/ProductCarousel";

const ProductsPage = ({ match }) => {
    const { keyword, pageNumber } = match.params;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, error, totalPages, page } = productList;

    useEffect(() => {
       dispatch(fetchProductList(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])
    
    return (
        <div>
            {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                <>
                <Row>
                    {products && products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })}
                </Row>
                    <Col>
                        {totalPages > 1 && <Paginate pages={totalPages} page={page} keyword={keyword} />}
                    </Col>    
                </>
            }
        </div>
    )
}

export default ProductsPage
