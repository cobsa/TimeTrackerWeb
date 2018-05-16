import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
          if (!activeRecord) return 'No active record'
          return (
            <div>
              <div>{activeRecord.start}</div>
              <div>{activeRecord.type}</div>
              <Mutation mutation={END_RECORD}>
                {endRecord => (
                  <button
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
