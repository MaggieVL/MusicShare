import React from 'react';
import ButtonAppBar from './components/button-appbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from './components/users/log-in';
import SignUp from './components/users/sign-up'; 
import Home from './components/home';
import AllUsers from './components/users/all-users'
import './App.css';
import UserProfile from './components/users/user-profile';
import SongIdeaCreate from './components/songs/song-idea-create';
import SongCreate from './components/songs/song-create';
import AlbumCreate from './components/songs/album-create';

export default function App() {
  return (
  <BrowserRouter>
    <ButtonAppBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/log-in' component={LogIn} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/users' component={AllUsers} />
          <Route exact path='/users/:userId/songs/create' component={SongCreate} />
          <Route exact path='/users/:userId/songIdeas/create' component={SongIdeaCreate} />
          <Route exact path='/users/:userId/albums/create' component={AlbumCreate} />
          <Route exact path='/users/:userId' component={UserProfile} />
        </Switch>    
  </BrowserRouter>
  );
}