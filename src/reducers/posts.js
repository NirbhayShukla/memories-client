import { postActions } from "../constants/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case postActions.FETCH_ALL:
      return action.payload;
    case postActions.CREATE:
      return [...state, action.payload];
    case postActions.UPDATE:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case postActions.DELETE:
      return state.filter((item) => item._id !== action.payload);

    case postActions.FETCH_BY_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
