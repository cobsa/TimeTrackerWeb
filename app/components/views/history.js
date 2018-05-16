import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const query = gql`
  {
    records {
      start
      end
      type
      done
    }
  }
`

export default class History extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'
          if (error) return 'ERRRR'
          return (
            <div>
              {data.records.map(record => (
                <div>
                  <div>{record.start}</div>
                  <div>{record.done}</div>
                  <div>{record.type}</div>
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}
