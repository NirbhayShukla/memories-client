import React from "react";
import { AppBar, Avatar, Typography, Button, Toolbar } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";

function Navbar() {
  const user = null;
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        {/* <Link to="/"> */}
        <Typography
          component="h2"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        {/* </Link> */}
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imgUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
            >
              Log Out
            </Button>
          </div>
        ) : (
          //   <Link to="/auth">
          <Button variant="contained" color="primary">
            Sign In
          </Button>
          //   </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
