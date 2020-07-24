import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
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
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.performer}
          </Typography>
        </CardContent>
        <audio controls>
          <source src={song} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.cover}
        title={props.title}
      />
    </Card>
  );
}