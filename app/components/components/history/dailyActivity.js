import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import BasePie from './basePie'

export default class DailyActivity extends Component {
  constructor() {
    super()
    this.state = {
      day: moment(),
      header: 'Today'
    }
  }
  // Show
  render() {
    const { types, records } = this.props
    return (
      <article>
        <section className="center">
          <div>
            <button
              onClick={() => {
                this.setState({ day: moment(), header: 'Today' })
              }}
            >
              Today
            </button>
            <button
              onClick={() => {
                this.setState({ day: moment().subtract(1, 'days'), header: 'Yesterday' })
              }}
            >
              Yesterday
            </button>
          </div>
          <h2>{this.state.header}</h2>
          <BasePie records={records} types={types} day={this.state.day} />
        </section>
      </article>
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
