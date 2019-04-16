import React from 'react'

import Header from './Header'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      equalPassword: true,
      checkMail: true,
      users: [],
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value })
  }

  sendData(event) {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, users } = this.state
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        this.setState({
          checkMail: false
        })

        return
      }

      this.setState({
        checkMail: true
      })
    }

    let equalPassword = true;
    if (password !== confirmPassword) {
      equalPassword = false;
      this.setState({
        equalPassword
      })
      return
    }

    if (firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '') {
      alert('Заполните все поля')
      return
    }

    let user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    this.createUser(user)
    alert('Вы успешно зарегистрировались')
  }

  createUser(user) {
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    })
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
    const { firstName, lastName, email, password,
      confirmPassword, equalPassword, checkMail } = this.state

    return (
      <div className="container" >
        <Header />
        <div className="row justify-content-center">
          <h1 className="registration">Registration</h1>
        </div>
        <div className="row justify-content-center">
          <div className="sign-up-block">
            <form id="form">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Firs name"
                  value={firstName}
                  onChange={this.handleChangeFirstName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={this.handleChangeLastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.handleChangeEmail}
                />
                {checkMail ? '' : <p className="password-is-not-equql">
                  This mail is already in use</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
                {equalPassword ? '' : <p className="password-is-not-equql">Password isn't equal</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={this.handleChangeConfirmPassword}
                />
                {equalPassword ? '' : <p className="password-is-not-equql">Password isn't equal</p>}
              </div>
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.sendData.bind(this)}
                >Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp