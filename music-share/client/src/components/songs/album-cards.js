import React from 'react';
import AlbumCard from './album-card'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function AlbumCards(props) {
    const classes = useStyles();

    return(
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    {props.albums.map((album) => (
                        <Grid key={album.id} item>
                            <AlbumCard {...album} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}