import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import LoginForm from '../components/loginForm'
import * as userActions from '../../redux/user/index'
import ErrorGraphQL from '../components/errorGraphQL'

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`

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
      <div className="login">
        <div className="center">
          <h2>Login</h2>
          <Mutation mutation={LOGIN_USER} onCompleted={this.handleResponse}>
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
                {error && <ErrorGraphQL message={error.message} />}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  logged: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({ logged: state.user.logged }))(Login)
