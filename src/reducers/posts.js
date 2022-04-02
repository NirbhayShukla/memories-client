import { postActions, loading } from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [], post: {} }, action) => {
  switch (action.type) {
    case loading.START:
      return { ...state, isLoading: true };
    case loading.END:
      return { ...state, isLoading: false };

    case postActions.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case postActions.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case postActions.UPDATE:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case postActions.DELETE:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };

    case postActions.FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case postActions.FETCH_POST:
      return { ...state, post: action.payload };
    case postActions.COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;

          return post;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
