import {USER_ACTION as POST_ACTIONS} from "../actions/posts";

const initialState = {
  list: null,
  loadingError: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case POST_ACTIONS.POPULATE:
      return {
        ...state,
        list: action.payload
      };
    case POST_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload
      };
    default:
      return state;
  }
}