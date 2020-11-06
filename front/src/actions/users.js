import {ENDPOINTS} from "../consts";
import {POSTS_TEXT} from "../text";

export const USER_ACTIONS = {
  POPULATE: 'USER_POPULATE',
  SET_LOADING_ERROR: 'USER_SET_LOADING_ERROR'
};

export const populate = users => {
  return {
    type: USER_ACTIONS.POPULATE,
    payload: users
  };
}

const setLoadingError = error => {
  return {
    type: USER_ACTIONS.SET_LOADING_ERROR,
    payload: error
  };
}

export function loadUsers() {
  return async dispatch => {
    dispatch(setLoadingError(null));
    let success = false;
    try {
      const response = await fetch(ENDPOINTS.USERS)
      if (response.status === 200) {
        const users = await response.json();
        dispatch(populate(users));
        success = true;
      }
    } finally {
      if (!success) {
        dispatch(setLoadingError(POSTS_TEXT.LOADING_ERROR));
      }
    }
  };
}
