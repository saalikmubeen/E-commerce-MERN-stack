import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserList, deleteUser } from '../actions/userActions';


const UserListPage = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector((state) => state.userList);
    const {  loading: loadingDelete, error: deleteError, success } = useSelector((state) => state.userDelete);
    const { currentUser } = useSelector((state) => state.loginUser);

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            history.push("/");
        }

        if (success) {
            dispatch(getUserList());
        }

        dispatch(getUserList());

    }, [dispatch, currentUser, history, success])

    return (
        <>
        <h1>Users</h1>
            {deleteError && <Message variant="danger">{deleteError}</Message>}
      {loading || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => dispatch((deleteUser(user._id)))}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
    )
}

export default UserListPage
