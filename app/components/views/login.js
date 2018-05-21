import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import LoginForm from '../components/loginForm'
import queries from '../../graphql/queries'
import * as userActions from '../../redux/user/index'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleResponse = this.handleResponse.bind(this)
    // Bind action creators
    const { dispatch } = props
    this.boundActionCreators = bindActionCreators(userActions, dispatch)
  }

  handleResponse(data) {
    const { loginUser } = data
    const { dispatch } = this.props
    if (loginUser) {
      localStorage.setItem('token', data.loginUser)
      dispatch(userActions.loginUser({ jwt: data.loginUser }))
    }
  }
  render() {
    const { logged } = this.props
    if (logged) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h2>Login</h2>
        <Mutation mutation={queries.LOGIN_USER} onCompleted={this.handleResponse}>
          {(loginUser, { loading, error }) => (
            <div>
              <LoginForm
                handleSubmit={(email, password) => {
                  loginUser({
                    variables: {
                      email,
                      password
                    }
                  })
                }}
              />
              {loading && <p>Loading...</p>}
              {error && <p>ERRRRRRR</p>}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

Login.propTypes = {
  logged: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({ logged: state.user.logged }))(Login)
