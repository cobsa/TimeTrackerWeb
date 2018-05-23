import React, { Component } from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import GET_TYPES from '../../graphql/getTypes'
import DailyActivity from '../components/history/dailyActivity'
import ErrorGraphQL from '../components/errorGraphQL'

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

class History extends Component {
  render() {
    const { recordsData, recordTypesData } = this.props
    if (recordsData.error || recordTypesData.error) {
      return <ErrorGraphQL message={recordsData.error.message || recordTypesData.error.message} />
    }
    if (!recordsData.loading && !recordTypesData.loading) {
      const types = recordTypesData.__type.enumValues
      const { records } = recordsData
      return (
        <div className="history">
          <DailyActivity records={records} types={types} />
        </div>
      )
    }
    return 'Loading'
  }
}

History.propTypes = {
  recordsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    records: PropTypes.arrayOf.isRequired
  }).isRequired,
  recordTypesData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    __type: PropTypes.shape({
      enumValues: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ).isRequired
    })
  }).isRequired
}

export default compose(
  graphql(query, { name: 'recordsData' }),
  graphql(GET_TYPES, { name: 'recordTypesData' })
)(History)
