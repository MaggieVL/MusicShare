import React from 'react';
import SongCard from './song-card'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: theme.spacing.unit * 2,
  },
}));

export default function Player(props) {
    const classes = useStyles();

    return(
        <>
            {props.songs.map(song => (
                <div className={classes.cardContainer}>
                    <SongCard {...song} />
                </div>
            ))}
        </>
    );
}