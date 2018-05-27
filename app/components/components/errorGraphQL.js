import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import ErrorMessage from './errorMessage'

export default class ErrorGraphQL extends Component {
  render() {
    const { message } = this.props
    if (message === 'GraphQL error: Unauthorized Access') {
      return <Redirect to="/" />
    }
    if (message !== '') {
      return <ErrorMessage message={message} />
    }
    return <ErrorMessage message="Unknown error" />
  }
}

ErrorGraphQL.propTypes = {
  message: PropTypes.string
}

ErrorGraphQL.defaultProps = {
  message: ''
}
