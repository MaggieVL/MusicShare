import React, { useState, useEffect } from 'react';
import SongService from './../services/songService';
import genreOptions from './input-form/data/genre-options';
import Player from './songs/player';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        padding: ` 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        margin: "auto",
    },
}));


export default function Home() {
    const [allSongs, setAllSongs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function fetchAllSongs() {
            setAllSongs(await SongService.getAllSongs());
        }
        fetchAllSongs();
    }, []);

    console.log("allSongs " + allSongs);
    return(
        <Paper className={classes.root}>
        { genreOptions.map(({value, label}) => {
            let filtered = allSongs.filter((song) => {
                return song.genre.includes(value);
            });
            console.log(filtered);
            
            return (
                <>
                    {filtered.length > 0 ? (<div key={label}>
                        <h2> {label} </h2>
                        <Player songs={filtered.slice(0,2)}/>
                    </div>) : ""}
                </>
            );
        })}
        </Paper>
    )
}