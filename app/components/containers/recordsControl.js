import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

import GET_TYPES from '../../graphql/getTypes'
import ActivityButton from '../components/activityButton'

const START_RECORD = gql`
  mutation startRecord($type: String!, $start: String!) {
    startRecord(type: $type, start: $start) {
      _id
      done
    }
  }
`

export default class RecordsControl extends Component {
  render() {
    return (
      <Query query={GET_TYPES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'
          if (error) return 'Error'
          const typeList = data.__type.enumValues
          return (
            <Mutation mutation={START_RECORD}>
              {startRecord => (
                <div className="activity-button-grid">
                  {typeList.map(enumType => {
                    return (
                      <ActivityButton
                        type={enumType.name}
                        key={enumType.name}
                        onClick={type => {
                          startRecord({ variables: { type, start: new Date().toISOString() } })
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
