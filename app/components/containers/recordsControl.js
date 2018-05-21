import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
    const typeList = ['Work', 'Workout', 'Free time', 'Sleep']
    return (
      <Mutation mutation={START_RECORD}>
        {startRecord => (
          <div className="activity-button-grid">
            {typeList.map(typeName => {
              return (
                <ActivityButton
                  type={typeName}
                  key={typeName}
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
  }
}
