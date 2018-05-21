import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ActiveRecordDetails from '../components/activeRecordDetails'
import NoActiveRecord from '../components/noActiveRecord'

const ACTIVE_RECORD = gql`
  {
    user {
      activeRecord {
        start
        end
        type
        _id
      }
    }
  }
`

const END_RECORD = gql`
  mutation($end: String!, $id: String!) {
    endRecord(end: $end, id: $id) {
      done
    }
  }
`

export default class ActiveRecord extends Component {
  render() {
    return (
      <Query query={ACTIVE_RECORD} pollInterval={250}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'
          if (error) return 'ERRR'
          const { activeRecord } = data.user
          if (!activeRecord) return <NoActiveRecord />
          return (
            <div className="active-record">
              <ActiveRecordDetails {...activeRecord} />
              <Mutation mutation={END_RECORD}>
                {endRecord => (
                  <button
                    className="end-activity-button"
                    onClick={() => {
                      endRecord({
                        variables: {
                          id: activeRecord._id,
                          end: new Date().toISOString()
                        }
                      })
                    }}
                  >
                    End
                  </button>
                )}
              </Mutation>
            </div>
          )
        }}
      </Query>
    )
  }
}
