import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Today from '../components/history/today'

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
          if (!data.records) return 'No data yet'
          return (
            <div className="history">
              <Today records={data.records} />
              <Today records={data.records} />
              <Today records={data.records} />
            </div>
          )
        }}
      </Query>
    )
  }
}
