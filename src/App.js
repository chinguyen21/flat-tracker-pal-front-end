import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import {Typography, Button, AppBar, Toolbar, Avatar } from '@material-ui/core';
import styling from './styling/Styling'
import './App.css';

import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Authorization from './containers/Authorization';
import Unauthorization from './containers/Unauthorization';


const App = () => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false)

  const handleLogout = () => {
    localStorage.clear();
    setUser({});
    setLoggedIn(false);
    <Redirect to="/"/>
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/find", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: localStorage.token})
    })
    .then(res => res.json())
    .then(setUser)
  },[])

  return (
    <div className={styling().root}>

      <Router>
        <AppBar position="static">
          <Toolbar style={{background: "#9feded"}}>
            <Typography variant="h6" className={styling().title} >
              <Button><Link to= "/" style={{ textDecoration: 'none', color: '#3b8050'}}>Home</Link></Button>
            </Typography>
            <Button><Link to= "/login" style={{ textDecoration: 'none', color: '#3b8050'}}>Log In</Link></Button>
            <Button><Link to= "/signup" style={{ textDecoration: 'none', color: '#3b8050'}}>Sign Up</Link></Button>
            <Button onClick={handleLogout} style={{ color: '#3b8050' }}>Log Out</Button>
            <Avatar>{user.name!==undefined ? user.name.slice(0,1) : null}</Avatar>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Authorization user={user} setUser={setUser}/> : <Unauthorization/>}
          </Route>
          <Route exact path='/login'>
            {loggedIn ? <Redirect to="/" /> : <Login setUser={setUser} setLoggedIn={setLoggedIn}/>}
          </Route>
          <Route exact path='/signup'>
            {loggedIn ? <Redirect to="/" /> : <Signup setUser={setUser} setLoggedIn={setLoggedIn}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


