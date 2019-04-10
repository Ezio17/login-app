import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.users = [];
    this.getUsers()

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      equalPassword: true,
      checkMail: true
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
    this.createUser = this.createUser.bind(this)
    this.getUsers = this.getUsers.bind(this)
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
    const { firstName, lastName, email, password, confirmPassword } = this.state
    this.userMail = ''

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        this.setState({
          checkMail: false
        })

        return
      }
    }

    let equalPassword = true;
    if (password !== confirmPassword) {
      equalPassword = false;
    }

    this.setState({
      equalPassword,
    })

    if (firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '') {
      alert('Заполните все поля')
      return
    }

    if (!equalPassword) {
      return
    }

    let user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }

    this.createUser(user)
  }

  createUser(user) {
    fetch('http://127.0.0.1:3000/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }).then(res => res.json())
      .then(data => console.log(data));
  }

  getUsers() {
    fetch('http://127.0.0.1:3000/users')
      .then(response => response.json())
      .then(users => this.users = users)
  }



  render() {
    const { firstName, lastName, email, password, confirmPassword, equalPassword, checkMail } = this.state

    return (
      <div className="container" >
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

export default Login