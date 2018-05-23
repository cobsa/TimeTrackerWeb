import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import BasePie from './basePie'

export default class DailyActivity extends Component {
  // Show
  render() {
    const { types, records } = this.props
    return (
      <div className="history">
        <div className="day">
          <h2>Your activity today</h2>
          <BasePie records={records} types={types} day={moment()} />
        </div>
        <div className="day">
          <h2>Your activity yesterday</h2>
          <BasePie records={records} types={types} day={moment().subtract(1, 'days')} />
        </div>
      </div>
    )
  }
}

DailyActivity.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      type: PropTypes.string,
      done: PropTypes.bool
    })
  ).isRequired
}
