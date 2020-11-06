import {combineReducers} from "redux";
import {reducer as usersReducer} from "./users";
import {reducer as postsReducer} from "./posts";

export const reducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});
