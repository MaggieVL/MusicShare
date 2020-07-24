import React from 'react';
import UserCard from './user-card.js';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function CardList(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    {props.items.map((item) => (
                        <Grid key={item.id} item>
                            <UserCard {...item} onDelete={() => props.onDelete(item)}
                                onEdit={() => props.onEdit(item)} onProfileVisit={() => props.onProfileVisit(item)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}