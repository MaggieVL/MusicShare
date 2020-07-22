import React from 'react';
import ButtonAppBar from './components/button-appbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from './components/users/log-in';
import SignUp from './components/users/sign-up'; 
import Home from './components/home';
import AllUsers from './components/users/all-users'
import './App.css';

export default function App() {
  return (
  <BrowserRouter>
    <ButtonAppBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/log-in' component={LogIn} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/users' component={AllUsers} />
        </Switch>    
  </BrowserRouter>
  );
}