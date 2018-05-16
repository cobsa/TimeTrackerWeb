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
    return (
      <Mutation mutation={START_RECORD}>
        {startRecord => (
          <div>
            <ActivityButton
              type="work"
              onClick={type => {
                startRecord({ variables: { type, start: new Date().toISOString() } })
              }}
            />
          </div>
        )}
      </Mutation>
    )
  }
}
