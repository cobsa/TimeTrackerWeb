import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Welcome from '../components/welcome'
import RecordsControl from '../containers/recordsControl'
import ActiveRecord from '../containers/activeRecord'

class Home extends Component {
  render() {
    const { logged } = this.props
    if (logged) {
      return (
        <article>
          <ActiveRecord />
          <RecordsControl />
        </article>
      )
    }
    return <Welcome />
  }
}

Home.propTypes = {
  logged: PropTypes.bool.isRequired
}

export default connect(state => ({ logged: state.user.logged }))(Home)
