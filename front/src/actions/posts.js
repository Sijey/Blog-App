import {ENDPOINTS} from "../consts";
import {POSTS_TEXT} from "../text";
import {populate as populateUsers} from "./users";

export const POST_ACTIONS = {
  POPULATE: 'POST_POPULATE',
  SET_LOADING_ERROR: 'POST_SET_LOADING_ERROR'
};

const populate = posts => {
  return {
    type: POST_ACTIONS.POPULATE,
    payload: posts
  };
}

const setLoadingError = error => {
  return {
    type: POST_ACTIONS.SET_LOADING_ERROR,
    payload: error
  };
}

export function loadPosts() {
  return async dispatch => {
    dispatch(setLoadingError(null));
    let success = false;
    try {
      const response = await fetch(ENDPOINTS.POSTS)
      if (response.status === 200) {
        const posts = await response.json();

        const usersResponse = await fetch(ENDPOINTS.USERS);
        if (usersResponse.status === 200) {
          const users = await usersResponse.json();
          dispatch(populateUsers(users));
          dispatch(populate(posts));
          success = true;
        }
      }
    } finally {
      if (!success) {
        dispatch(setLoadingError(POSTS_TEXT.LOADING_ERROR));
      }
    }
  };
}
