import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import * as userActions from '../../redux/user/index'
import SignupForm from '../components/signupForm'

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`

const SIGNUP_USER = gql`
  mutation addUSer($name: String!, $email: String!, $password: String!, $passwordAgain: String!) {
    addUser(name: $name, email: $email, password: $password, passwordAgain: $passwordAgain) {
      _id
    }
  }
`

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    // Bind action creators
    const { dispatch } = props
    this.boundActionCreators = bindActionCreators(userActions, dispatch)
  }

  handleSignup(name, email, password, passwordAgain) {
    this.props
      .SIGNUP_USER({
        variables: {
          name,
          email,
          password,
          passwordAgain
        }
      })
      .then(() => {
        this.props
          .LOGIN_USER({
            variables: {
              email,
              password
            }
          })
          .then(data => this.handleLogin(data.data))
      })
  }

  handleLogin(data) {
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
          <h2>Sign up</h2>
          <SignupForm
            handleSubmit={(name, email, password, passwordAgain) => {
              this.handleSignup(name, email, password, passwordAgain)
            }}
          />
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  logged: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  LOGIN_USER: PropTypes.func.isRequired,
  SIGNUP_USER: PropTypes.func.isRequired
}

export default compose(
  connect(state => ({ logged: state.user.logged })),
  graphql(LOGIN_USER, { name: 'LOGIN_USER' }),
  graphql(SIGNUP_USER, { name: 'SIGNUP_USER' })
)(Signup)
