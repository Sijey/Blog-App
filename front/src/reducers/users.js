import {USER_ACTIONS} from "../actions/users";

const initialState = {
  list: null,
  loadingError: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTIONS.POPULATE:
      return {
        ...state,
        list: action.payload
      };
    case USER_ACTIONS.SET_LOADING_ERROR:
      return {
        ...state,
        loadingError: action.payload
      };
    default:
      return state;
  }
}
