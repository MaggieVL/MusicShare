import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ currentUser, setCurrentUser }) {
  const classes = useStyles();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.setItem('current-user', null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MusicShare
          </Typography>
          {currentUser ? <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      component={Link} to={`/users/${currentUser.id || currentUser._id}`}>
            <AccountCircleIcon />
          </IconButton> : ""}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      component={Link} to={`/users`}>
            <GroupIcon />
          </IconButton>
          { !currentUser ? <Button color="inherit" component={Link} to='/log-in'>Log in</Button> : "" }
          { !currentUser ? <Button color="inherit" component={Link} to='/sign-up'>Sign up</Button> : "" }
          { currentUser ? <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      component={Link} to='/' onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
}