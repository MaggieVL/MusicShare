import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
  audio: {
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
    margin: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
  },
  cover: {
    width: 250,
  },
}));

export default function SongCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [song, setSong] = useState('');
  console.log("audioname: " + props.audiofileName);

  useEffect(() => {
    setSong(`http://localhost:8080/static/songs/${props.audiofileName}`);
    console.log(song);
  }, []); 

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={props.cover}
        title={props.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.performer}
          </Typography>
        </CardContent>
        <audio controls className={classes.audio}>
          <source src={song} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </Card>
  );
}