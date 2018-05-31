import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import GET_TYPES from '../../graphql/getTypes'
import ActivityButton from '../components/activityButton'
import ErrorGraphQL from '../components/errorGraphQL'
import Loading from '../components/loading'

const START_RECORD = gql`
  mutation startRecord($type: String!, $start: String!) {
    startRecord(type: $type, start: $start) {
      _id
      done
    }
  }
`

const END_RECORD = gql`
  mutation endRecord($id: String!, $end: String!) {
    endRecord(id: $id, end: $end) {
      done
    }
  }
`

const GET_ACTIVE = gql`
  {
    user {
      activeRecord {
        _id
      }
    }
  }
`

class RecordsControl extends Component {
  render() {
    const { types, active } = this.props
    if (types.loading || active.loading) {
      return <Loading />
    }
    if (types.error || active.error) {
      return <ErrorGraphQL message={(types.error || active.error).message} />
    }
    const typeList = types.__type.enumValues
    const { activeRecord } = active.user
    return (
      <section>
        <h2>{activeRecord ? 'Change activity' : 'Choose activity'}</h2>
        <div className="activity-button-grid">
          {typeList.map(enumType => {
            return (
              <ActivityButton
                type={enumType.name}
                key={enumType.name}
                onClick={type => {
                  if (activeRecord) {
                    this.props.end_record({
                      variables: { id: activeRecord._id, end: new Date().toISOString() }
                    })
                  }
                  this.props.start_record({ variables: { type, start: new Date().toISOString() } })
                }}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

RecordsControl.propTypes = {
  types: PropTypes.shape({
    loading: PropTypes.bool,
    __type: PropTypes.shape({
      enumValues: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ).isRequired
    })
  }).isRequired,
  end_record: PropTypes.func.isRequired,
  start_record: PropTypes.func.isRequired,
  active: PropTypes.shape({
    loading: PropTypes.bool
  }).isRequired
}

export default compose(
  graphql(GET_TYPES, { name: 'types' }),
  graphql(GET_ACTIVE, { name: 'active' }),
  graphql(START_RECORD, { name: 'start_record' }),
  graphql(END_RECORD, { name: 'end_record' })
)(RecordsControl)
