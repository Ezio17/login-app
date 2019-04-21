import React from 'react'

import UsersContext from './../context'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      users: [],
      isAuthorithed: false,
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  static contextType = UsersContext;

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  sendData(event) {
    event.preventDefault();
    const { email, password, users } = this.state

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        this.setState({
          isAuthorithed: true,
        })

        this.context.getEmail(users[i].email)
        return
      }
    }

    alert('Неверная почта или пароль')
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(users => {
        this.setState({
          users,
        })
      })
  }

  render() {
    const { email, password } = this.state

    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="registration">Sign up</h1>
        </div>
        <div className='row justify-content-center'>
          <div className="sign-up-block">
            <form>
              <div className="form-group text-center">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.handleChangeEmail}
                />
              </div>
              <div className="form-group text-center">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <div className="col text-center">

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.sendData}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login