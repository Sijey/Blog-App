import {ENDPOINTS} from "../consts";
import {POSTS_TEXT} from "../text";

export const USER_ACTION = {
  POPULATE: 'POPULATE',
  SET_LOADING_ERROR: 'SET_LOADING_ERROR'
};

function populate(posts) {
  return {
    type: USER_ACTION.POPULATE,
    payload: posts
  };
}

const setLoadingError = error => {
  return {
    type: USER_ACTION.SET_LOADING_ERROR,
    payload: error
  };
};

export function loadPosts() {
  return async dispatch => {
    dispatch(setLoadingError(null));
    let success = false;
    try {
      const response = await fetch(ENDPOINTS.POSTS)
      if (response.status === 200) {
        const posts = await response.json();
        dispatch(populate(posts));
        success = true;
      }
    } finally {
      if (!success) {
        dispatch(setLoadingError(POSTS_TEXT.LOADING_ERROR));
      }
    }
  };
}