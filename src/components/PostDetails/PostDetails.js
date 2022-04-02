import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost, getPostBySearch } from "../../actions/posts";
import useStyles from "./styles";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostBySearch({ search: "none", tags: post?.tags?.join(",") })
      );
    }
  }, [post]);

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);

  function openPost(id) {
    navigate(`/posts/${id}`);
  }

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper elevation={6} style={{ padding: "30px", borderRadius: "10px" }}>
      <div className={classes.card} elevation={6}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts?.length ? (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map((post) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                key={post._id}
                onClick={() => openPost(post._id)}
                className={classes.recommendedPost}
              >
                <Typography gutterBottom variant="h6">
                  {post.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {post.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {post.message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Likes : {post.likes.length}
                </Typography>
                <img src={post.selectedFile} width="200px" alt="" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
}

export default PostDetails;
