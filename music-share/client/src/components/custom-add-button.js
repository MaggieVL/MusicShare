import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 100,
      height: 100,
    },
});

export default function CustomAddButton(props) {
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardActionArea 
                className={classes.root} 
                onClick={props.onClick}
            >
                <CardContent>
                    Add a new {props.item}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}