import React from 'react'

import UsersContext from './../context'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
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
    const { users } = this.state
    const { email } = this.context
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            <table id="info-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user =>
                  <tr key={user.email}>
                    <td
                      className={email === user.email ? 'currentUser' : ''}
                    >{user.firstName}</td>
                    <td
                      className={email === user.email ? 'currentUser' : ''}
                    >{user.lastName}</td>
                    <td
                      className={email === user.email ? 'currentUser' : ''}
                    >{user.email}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

HomePage.contextType = UsersContext;

export default HomePage