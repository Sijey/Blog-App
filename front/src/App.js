import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers/reducer";
import Posts from "./components/posts/posts";
import Users from "./components/users/users"
import thunk from "redux-thunk";
import {Navbar, Nav} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Blog App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="posts">Posts</Nav.Link>
              <Nav.Link href="users">Users</Nav.Link>
            </Nav>
        </Navbar>
        <Switch>
          <Route path="/" exact render={() => <h1>Welcome!</h1>} />
          <Route path="/users" component={props => <Users {...props} />} />
          <Route path="/posts" component={props => <Posts {...props} />} />
        </Switch>
    </Provider>
  );
}

export default App;
