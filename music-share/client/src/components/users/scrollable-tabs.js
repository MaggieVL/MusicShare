import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SongService from './../../services/songService';
import Player from './../songs/player';
import CustomAddButton from './../custom-add-button';

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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allUserSongs, setAllUserSongs] = useState([]);

  useEffect(() => {
    async function fetchAllUserSongs() {
      setAllUserSongs(await SongService.getAllUserSongs(props.userId));
    }
    fetchAllUserSongs();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  const handleSongIdeaCreateRedirect = (user) => {
    history.push(`users/${user.id}/songIdeas/create/`);
  }

  const handleSongCreateRedirect = (user) => {
    history.push(`users/${user.id}/songs/create`);
  }

  const handleAlbumCreateRedirect = (user) => {
    history.push(`users/${user.id}/albums/create`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Songs" {...a11yProps(0)}/>
          <Tab label="Albums" {...a11yProps(1)} />
          <Tab label="Song Ideas" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Player songs={allUserSongs} />
        <CustomAddButton item="song"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomAddButton item="album"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomAddButton 
            item="song idea"
            onClick={handleSongIdeaRedirect}  
        />
      </TabPanel>
    </div>
  );
}
