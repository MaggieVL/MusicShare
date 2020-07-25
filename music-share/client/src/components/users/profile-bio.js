import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
    },
    media: {
      height: 140,
    },
});
        
export default function ProfileBio(props) {
    const classes = useStyles();

    return ( 
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.imageURL}
                title={props.username}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.genres && props.genres.join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
}