import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SongService from './../../services/songService';
import SongIdeaService from './../../services/songIdeaService';
import AlbumService from './../../services/albumService';
import Player from './../songs/player';
import AlbumCards from './../songs/album-cards';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function ScrollableTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allUserSongs, setAllUserSongs] = useState([]);
  const [allUserSongIdeas, setAllUserSongIdeas] = useState([]);
  const [allUserAlbums, setAllUserAlbums] = useState([]);

  useEffect(() => {
    async function fetchAllUserSongs() {
      setAllUserSongs(await SongService.getAllUserSongs(props.userId));
    }
    async function fetchAllUserSongIdeas() {
      setAllUserSongIdeas(await SongIdeaService.getAllUserSongIdeas(props.userId));
    }
    async function fetchAllUserAlbums() {
      setAllUserAlbums(await AlbumService.getAllUserAlbums(props.userId));
    }
    fetchAllUserSongs();
    fetchAllUserSongIdeas();
    fetchAllUserAlbums();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  const currentUserId = currentUser.id || currentUser._id;
  const isCurrentUser = currentUserId === props.userId;

  const handleSongIdeaCreateRedirect = () => {
    history.push(`${currentUser._id || currentUser.id}/songIdeas/create`);
  }

  const handleSongCreateRedirect = () => {
    history.push(`${currentUser._id || currentUser.id}/songs/create`);
  }

  const handleAlbumCreateRedirect = () => {
    history.push(`${currentUser._id || currentUser.id}/albums/create`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Songs" {...a11yProps(0)}/>
          <Tab label="Albums" {...a11yProps(1)} />
          <Tab label="Song Ideas" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        { isCurrentUser ? <Button variant="outlined" color="primary"
          onClick={handleSongCreateRedirect}>Add a new song</Button> : '' }
        <Player songs={allUserSongs} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        { isCurrentUser ? <Button variant="outlined" color="primary"
          onClick={handleAlbumCreateRedirect}>Add a new album</Button> : '' }
        <AlbumCards albums={allUserAlbums} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        { isCurrentUser ? <Button variant="outlined" color="primary"
          onClick={handleSongIdeaCreateRedirect}>Add a new song idea</Button> : '' }
        <Player songs={allUserSongIdeas} />
      </TabPanel>
    </div>
  );
}
