import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLikeClick = async () => {
    dispatch(likePost(post._id));

    const hasLiked = post.likes.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    );

    if (hasLiked) {
      setLikes(
        post.likes.filter(
          (id) => id !== (user?.result?.googleId || user?.result?._id)
        )
      );
    } else {
      setLikes([...post.likes, user?.result?.googleId || user?.result?._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        {post.selectedFile && (
          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />
        )}
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {/* {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <EditIcon fontSize="medium" />
            </Button>
          </div>
        )} */}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" component="p" color="textSecondary">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLikeClick}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <EditIcon fontSize="medium" />
            </Button>
          </div>
        )}
        {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
