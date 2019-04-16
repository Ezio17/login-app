import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SingUp'
import HomePage from './components/HomePage'
import UsersContext from './context'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: undefined
    }

    this.getEmail = this.getEmail.bind(this)
  }

  getEmail(email) {

    this.setState({
      email,
    })
  }

  render() {
    const value = {
      email: this.state.email,
      getEmail: this.getEmail,
    }

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UsersContext.Provider value={value}>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={Login} />} />
            <Route path="/" component={HomePage} />} />
          </Switch>
        </UsersContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
