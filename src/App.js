import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Login from './components/Login'
import SignUp from './components/SignUp'

class App extends Component {
  // componentDidMount() {
  //   getUsers().then(console.log)
  // }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={Login} />
          <Route path="/" component={Header} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
