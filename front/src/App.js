import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers/posts";
import Posts from "./components/posts/posts";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  );
}

export default App;
