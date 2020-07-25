import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 250,
    },
    media: {
      height: 200,
    },
});
        
export default function AlbumCard(props) {
    const classes = useStyles();

    return ( 
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.cover}
                title={props.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
}