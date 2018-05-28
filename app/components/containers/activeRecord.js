import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ActiveRecordDetails from '../components/activeRecordDetails'
import NoActiveRecord from '../components/noActiveRecord'
import Loading from '../components/loading'
import ErrorGraphQL from '../components/errorGraphQL'

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
      <Query query={ACTIVE_RECORD} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return <ErrorGraphQL message={error.message} />
          const { activeRecord } = data.user
          if (!activeRecord) return <NoActiveRecord />
          return (
            <section>
              <Mutation mutation={END_RECORD}>
                {endRecord => (
                  <ActiveRecordDetails
                    {...activeRecord}
                    onEnd={() => {
                      endRecord({
                        variables: {
                          id: activeRecord._id,
                          end: new Date().toISOString()
                        }
                      })
                    }}
                  />
                )}
              </Mutation>
            </section>
          )
        }}
      </Query>
    )
  }
}
