import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-sm bg-light col-12">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link className="nav-link" to='/signup'>Sign Up</Link>
                </li>
                <li>
                  <Link className="nav-link" to='/signin'>Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }

}

export default Header