import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserDetails extends Component {
  render() {
    return (
      <div className="center">
        <div>
          <h2>Name</h2>
          <p>{this.props.name}</p>
        </div>

        <div>
          <h2>Email</h2>
          <p>{this.props.email}</p>
        </div>
      </div>
    )
  }
}

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}
