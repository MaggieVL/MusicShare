import React from 'react';


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