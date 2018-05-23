import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export default class ErrorGraphQL extends Component {
  render() {
    const { message } = this.props
    if (message === 'GraphQL error: Unauthorized Access') {
      return <Redirect to="/" />
    }
    return 'Unknown Error'
  }
}

ErrorGraphQL.propTypes = {
  message: PropTypes.string
}

ErrorGraphQL.defaultProps = {
  message: ''
}
