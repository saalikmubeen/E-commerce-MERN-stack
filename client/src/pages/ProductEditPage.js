import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateProduct, fetchProductDetail, fetchProductList} from '../actions/productActions';

const ProductEditPage = ({match, history}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const { error, loading, product, success} = useSelector((state) => state.productDetail)
    const { error: updateError, loading: loadingUpdate, success: updateSuccess } = useSelector((state) => state.updateProduct);
    const { currentUser } = useSelector((state) => state.loginUser);
    

    useEffect(() => {
        
        if (!currentUser || !currentUser.isAdmin) {
            return history.push("/");
        }


        if (!success || product._id !== match.params.id) {
            dispatch(fetchProductDetail(match.params.id));
        } else {
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setImage(product.image)
            setPrice(product.price)
        }

        if (updateSuccess) {
            dispatch({ type: "PRODUCT_UPDATE_RESET" })
            dispatch(fetchProductList());
            history.push("/admin/products");
        }
        
    }, [match, dispatch, product._id, updateSuccess, success, currentUser, history]) // don't pass product(object) as an dependency to useEffect dependencies Array 

    const handleSubmit = (e) => {
        e.preventDefault();
        const productObj = { name, price, image, brand, countInStock, category, description }
        
        dispatch(updateProduct(match.params.id, productObj));
    }


    return (
         <>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading || loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
    )
}

export default ProductEditPage;
