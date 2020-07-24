import React from 'react';
import SongCard from './song-card'

export default function Player(props) {
    return(
        <>
            {props.songs.map( song => <SongCard {...song} />)}
        </>
    );
}