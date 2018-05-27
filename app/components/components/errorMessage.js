import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorMessage extends Component {
  render() {
    return <div className="error">{this.props.message}</div>
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}
