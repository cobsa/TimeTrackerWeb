import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LoginForm extends Component {
  constructor() {
    super()
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.email, this.state.password)
  }
  render() {
    return (
      <div>
        <input
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmail}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePassword}
          onKeyDown={this.handleKeyDown}
        />
        <br />
        <br />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
