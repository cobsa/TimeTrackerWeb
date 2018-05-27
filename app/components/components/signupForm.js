import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignupForm extends Component {
  constructor() {
    super()
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handlePasswordAgain = this.handlePasswordAgain.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleName = this.handleName.bind(this)

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: ''
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e)
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    })
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

  handlePasswordAgain(e) {
    this.setState({
      passwordAgain: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.passwordAgain
    )
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleName} />
        <br />
        <br />
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
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Repeat password"
          value={this.state.passwordAgain}
          onChange={this.handlePasswordAgain}
          onKeyDown={this.handleKeyDown}
        />
        <br />
        <br />
        <button onClick={this.handleSubmit}>Sign up</button>
      </div>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
