import React from 'react'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      equalPassword: true,
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  sendData(event) {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state
    let equalPassword = true;
    if (password !== confirmPassword) {
      equalPassword = false;
    }

    this.setState({
      equalPassword,
    })

    if (!equalPassword) {
      return
    }

    let user = {
      email,
      password,
      confirmPassword,
    }

    console.log(user)
  }

  render() {
    const { email, password, confirmPassword, equalPassword } = this.state
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
                {equalPassword ? '' : <p className="password-is-not-equql">Password isn't equal</p>}
              </div>
              <div className="form-group text-center">
                <label htmlFor="confirm-password">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
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
                  onClick={this.sendData}
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