import * as api from "../api";
import { postActions, loading } from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: loading.START });
    const { data } = await api.fetchPosts(page);
    dispatch({
      type: postActions.FETCH_ALL,
      payload: data,
    });
    dispatch({ type: loading.END });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: loading.START });

    const { data } = await api.createPost(post);
    dispatch({ type: postActions.CREATE, payload: data });
    dispatch({ type: loading.END });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: postActions.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: postActions.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: loading.START });

    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);
    dispatch({
      type: postActions.FETCH_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: loading.END });
  } catch (error) {
    console.log(error);
  }
};
