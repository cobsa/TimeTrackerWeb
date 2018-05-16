import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ApolloConsumer } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import * as userActions from '../../redux/user/index'

class SignOut extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.boundActionCreators = bindActionCreators(userActions, dispatch)
  }
  componentDidMount() {
    localStorage.removeItem('token')
    const { dispatch } = this.props
    dispatch(userActions.logoutUSer())
  }
  render() {
    const { logged } = this.props
    if (logged) {
      return <div>Logging out</div>
    }
    return (
      <div>
        <ApolloConsumer>
          {client => {
            client.resetStore()
            return <Redirect to="/" />
          }}
        </ApolloConsumer>
      </div>
    )
  }
}

export default connect(state => ({ logged: state.user.logged }))(SignOut)
