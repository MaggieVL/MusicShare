import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default function CommentBox(props) {
    const classes = useStyles();
          
    return (
        <CssBaseline />
        <Paper square className={classes.paper}>
            <Typography className={classes.text} variant="h5" gutterBottom>
            Comments
            </Typography>
            <List className={classes.list}>
            {props.comments.map(({ id, author, timestamp,  message}) => (
                <React.Fragment key={id}>
                <ListItem button>
                    <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                    </ListItemAvatar>
                    <ListItemText primary={author} secondary={text} />
                </ListItem>
                </React.Fragment>
            ))}
            </List>
            <CommentInput/>
        </Paper>
    );
}