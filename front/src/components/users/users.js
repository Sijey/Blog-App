import React, {useEffect} from 'react';
import {Table, Alert, Button, Spinner} from "react-bootstrap";
import {POSTS_TEXT} from "../../text";
import {connect} from "react-redux";
import {loadUsers} from "../../actions/users";
import {getUsers, getUsersLoadingError} from "../../selectors/users";

const Users = ({users, error, load}) => {
  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>{error}</Alert.Heading>
        <Button variant="secondary" onClick={load}>{POSTS_TEXT.RETRY_LOADING}</Button>{' '}
      </Alert>
    );
  } else if (users) {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>))}
        </tbody>
      </Table>
    );
  } else {
    return (
      <Spinner animation="grow" inline="centered" />
    );
  }
};

export default connect(state => ({
  users: getUsers(state),
  error: getUsersLoadingError(state)
}), dispatch => ({
  load: () => dispatch(loadUsers())
}))(Users);
