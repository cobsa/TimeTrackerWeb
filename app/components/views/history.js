import React, { Component } from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import GET_TYPES from '../../graphql/getTypes'
import DailyActivity from '../components/history/dailyActivity'
import ErrorGraphQL from '../components/errorGraphQL'
import Loading from '../components/loading'

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
    if (recordsData.loading || recordTypesData.loading) {
      return <Loading />
    }
    if (recordsData.error || recordTypesData.error) {
      return <ErrorGraphQL message={recordsData.error.message || recordTypesData.error.message} />
    }
    const types = recordTypesData.__type.enumValues
    const { records } = recordsData
    return <DailyActivity records={records} types={types} />
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
