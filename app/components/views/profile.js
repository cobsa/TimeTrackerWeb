import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import UserDetails from '../components/userDetails'
import ErrorGraphQL from '../components/errorGraphQL'

const GET_USER = gql`
  {
    user {
      name
      email
    }
  }
`

export default class Profile extends Component {
  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return <ErrorGraphQL message={error.message} />
          const { user } = data
          return <UserDetails {...user} />
        }}
      </Query>
    )
  }
}
