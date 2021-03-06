import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { fetchProductList, deleteProduct, createProduct } from '../actions/productActions';
import Paginate from '../components/Paginate';

const ProductListPage = ({ history, match }) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1;
    const { loading, error, products, totalPages, page } = useSelector((state) => state.productList);
    const { loading: loadingDelete, success, deleteError } = useSelector((state) => state.deleteProduct);
    const { loading: loadingCreate, success: createSuccess, error: createError, product } = useSelector((state) => state.createProduct);
    const { currentUser } = useSelector((state) => state.loginUser);

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            history.push("/");
        } else {
            dispatch(fetchProductList("", pageNumber));

            if (success) {
                dispatch(fetchProductList("", pageNumber));
                dispatch({ type: "PRODUCT_DELETE_RESET" })
            }

            if (createSuccess) {
                history.push(`/admin/products/${product._id}/edit`);
                dispatch({ type: "PRODUCT_CREATE_RESET" })
            }
        }

    }, [dispatch, history, currentUser, success, createSuccess, product, pageNumber])
    return (
        <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' size="sm" onClick={() => dispatch(createProduct())}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {createError && <Message variant='danger'>{createError}</Message>}
      {loading || loadingDelete || loadingCreate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => dispatch(deleteProduct(product._id))}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
        {totalPages > 1 && < Paginate pages={totalPages} page={page} isAdmin={currentUser.isAdmin}/>}
    </>
    )
}

export default ProductListPage;
