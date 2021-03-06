import React, {useEffect} from 'react';
import {Table, Alert, Button, Spinner} from "react-bootstrap";
import {POSTS_TEXT} from "../../text";
import {connect} from "react-redux";
import {loadPosts} from "../../actions/posts";
import {getPosts, getPostsLoadingError} from "../../selectors/posts";

const Posts = ({posts, error, load}) => {
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
  } else if (posts) {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.userName}</td>
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
  posts: getPosts(state),
  error: getPostsLoadingError(state)
}), dispatch => ({
  load: () => dispatch(loadPosts())
}))(Posts);
