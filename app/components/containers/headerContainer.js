import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../components/header'

class HeaderContainer extends Component {
  render() {
    return <Header logged={this.props.logged} />
  }
}

HeaderContainer.propTypes = {
  logged: PropTypes.bool.isRequired
}

export default connect(state => ({ logged: state.user.logged }))(HeaderContainer)
