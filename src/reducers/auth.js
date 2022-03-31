import { authActions } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case authActions.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return { ...state, authData: action?.payload };
    case authActions.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
