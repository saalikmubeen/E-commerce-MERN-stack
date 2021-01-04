import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserAdmin } from '../actions/userActions';


const UserEditPage = ({match, history}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const { error, loading, user } = useSelector((state) => state.userDetailsAdmin);
    const { loading: loadingUpdate, error: errorUpdate, success } = useSelector((state) => state.updateUserAdmin);

    useEffect(() => {
        if (!user || user._id !== match.params.id) {
            dispatch(getUserDetails(match.params.id));
        }

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }

        if (success) {
            setMessage("User updated successfully!");
            dispatch(getUserDetails(match.params.id));
            dispatch({ type: "USER_UPDATE_RESET_ADMIN" });
            history.push("/admin/users")
        }

    }, [match, dispatch, user, success, history])


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUserAdmin(match.params.id, { name, email, isAdmin }));
    }

    return (
         <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {message && <Message>{message}</Message>}        
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

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditPage;
