import React from 'react'
import { Link } from 'react-router-dom'

import UsersContext from './../context'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.SingOut = this.SingOut.bind(this)
  }

  static contextType = UsersContext;

  SingOut() {
    this.context.getEmail(undefined)
  }

  render() {
    const { email } = this.context
    return (
      <header>
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-sm bg-light col-12">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link className="nav-link" to='/'>Home</Link>
                </li>
                {email === undefined ?
                  <>
                    <Link className="nav-link" to='/signin'>Sign in</Link>
                    <Link className="nav-link" to='/signup'>Sign up</Link>
                  </> :
                  <>
                    <p className="nav-link">{email}</p>
                    <Link
                      className="nav-link"
                      to='/'
                      onClick={this.SingOut}
                    >Sing out</Link>
                  </>}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default Header