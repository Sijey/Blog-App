import {createSelector} from "reselect";

export const getPosts = createSelector(
  state => state.posts.list,
  state => state.users.list,
  (posts, users) => {
    if (posts === null || users === null) {
      return null;
    }
    return posts.map(post => {
      const user = users.find(user => user.id === post.userId);
      return {
        ...post,
        userName: user ? user.name : "-"
      }
    })
  }
)
export const getPostsLoadingError = (state) => state.posts.loadingError;
