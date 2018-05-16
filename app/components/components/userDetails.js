import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserDetails extends Component {
  render() {
    return (
      <div>
        <h2>Name</h2>
        <p>{this.props.name}</p>
        <h2>Email</h2>
        <p>{this.props.email}</p>
      </div>
    )
  }
}

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}
